<?php

/**
 * @author Razvan Rauta
 * 25.10.2020
 * 12:23
 */

namespace App\Console\Commands\ParseWebPage\Parser;


use App\Jobs\SendEmail;
use App\Models\Advert;
use App\Models\AdvertImage;
use Carbon\Carbon;
use DOMDocument;
use DOMElement;
use DOMNodeList;
use DOMXPath;
use Exception;
use Illuminate\Database\QueryException;

class Parser
{

    private int $startingPageNumber;

    private int $maxNumberOfPages;

    private string $url;

    /**
     * Parser constructor.
     * @param string $url
     * @param int $startingPageNumber
     * @param int $maxNumberOfPages
     */
    public function __construct(string $url, int $startingPageNumber = 0, int $maxNumberOfPages = 3)
    {
        $this->url = $url;
        $this->startingPageNumber = $startingPageNumber;
        $this->maxNumberOfPages = $startingPageNumber + $maxNumberOfPages;
    }


    public function parse(): void
    {
        $newAdverts = [];

        for ($i = $this->startingPageNumber; $i <= $this->maxNumberOfPages; $i++) {

            $url = "$this->url?page=$i";
            if ($this->checkIfUrlIsValid($url)) {
                try {

                    $doc = new DOMDocument();
                    @$doc->loadHtml(file_get_contents($url));

                    $items = $this->findElementsByClassName('listing-item', $doc);

                    /** @var DOMElement $item */
                    foreach ($items as $item) {
                        /** @var DOMElement $element */
                        $element = is_array($this->getElementsByClass($item, 'a', 'teaser-title')) ? $this->getElementsByClass($item, 'a', 'teaser-title')[0] : null;
                        /** @var DOMElement $itemTitle */
                        if ($element !== null && !empty($element->getAttribute('href')) && $this->checkIfUrlIsValid($element->getAttribute('href'))) {

                            $arr = explode('/', $element->getAttribute('href'));

                            $advId = $arr[count($arr) - 2];
                            $advId = preg_replace("/[\D]/", "", $advId);
                            $advert = Advert::where('advertId', '=', $advId)->first();
                            if (!$advert) {
                                $newAdvert = $this->parseAdvertPage($element->getAttribute('href'), $advId);
                                if ($newAdvert) {
                                    $newAdverts[] = $newAdvert;
                                }
                            }

                        }

                    }

                } catch (Exception $exception) {
                    printf("\nThere was an error. %s \n", $exception->getMessage());
                }


            } else {
                printf("\nURL %s not reachable!\n", $this->url);
            }
        }

        if (!empty($newAdverts)) {
            SendEmail::dispatch($newAdverts);
            print("\nEmail job was dispatched \n");
        }

    }

    /**
     * @return bool|false|int
     */
    private function checkIfUrlIsValid(string $url)
    {
        $headers = @get_headers($url);
        return is_array($headers) ? preg_match('/^HTTP\\/\\d+\\.\\d+\\s+([23])\\d\\d\\s+.*$/', $headers[0]) : false;
    }


    /**
     * @param string $className
     * @param DOMDocument $dom
     * @return DOMNodeList|false
     */
    private function findElementsByClassName(string $className, DOMDocument $dom)
    {
        $finder = new DomXPath($dom);
        return $finder->query("//*[contains(@class, '$className')]");

    }

    private function getElementsByClass(&$parentNode, $tagName, $className): array
    {
        $nodes = array();

        $childNodeList = $parentNode->getElementsByTagName($tagName);
        for ($i = 0; $i < $childNodeList->length; $i++) {
            $temp = $childNodeList->item($i);
            if (stripos($temp->getAttribute('class'), $className) !== false) {
                $nodes[] = $temp;
            }
        }

        return $nodes;
    }


    /**
     * @param string $url
     * @param int $advId
     * @return Advert | boolean
     */
    private function parseAdvertPage(string $url, int $advId)
    {
        try {
            $advPage = new DOMDocument();
            @$advPage->loadHtml(file_get_contents($url));
            $advPage->preserveWhiteSpace = false;


            $advert = new Advert();
            $advert->advertId = $advId;
            $advert->advertUrl = $url;

            if (!empty($this->getElementsByClass($advPage, 'h1', 'h-giant media-body mb-0')[0])) {
                $title = $this->getElementsByClass($advPage, 'h1', 'h-giant media-body mb-0')[0]->nodeValue;
                $advert->title = trim($title);
            }

            if (!empty($this->getElementsByClass($advPage, 'div', 'top-description')[0])) {
                $description = $this->getElementsByClass($advPage, 'div', 'top-description')[0]->nodeValue;
                $advert->description = trim($description);
            }


            if (!empty($this->getElementsByClass($advPage, 'div', 'price-block')[0])) {
                $parentNode = $this->getElementsByClass($advPage, 'div', 'price-block')[0];
                $price = $parentNode->getElementsByTagName('strong')[0]->nodeValue;

                $advert->price = preg_replace("/[\D]/", "", trim($price)) ?: 10;
                $advert->priceType = preg_replace("/[^\D]/", "", trim($price)) ?: '/ unknown';
            }

            $infoBlocks = $this->getElementsByClass($advPage, 'div', 'info-mini-block');

            if (!empty($infoBlocks) && is_array($infoBlocks) && count($infoBlocks) > 0 && isset($infoBlocks[1], $infoBlocks[1]->textContent)) {
                $postDate = trim(explode(' ID', explode(' Опубликовано ', $infoBlocks[1]->textContent)[1])[0]);
                $advert->postedDate = $postDate ?: Carbon::now();

            }

            $tables = $advPage->getElementsByTagName('table');

            foreach ($tables as $table) {

                $tableData = $this->parseTable($table);
                foreach ($tableData as $data) {

                    if (!empty($data[0]) && strpos($data[0], 'Площадь общая/жилая/кухня') > -1) {

                        $advert->size = $data[1] ?: '';
                    }

                    if (!empty($data[0]) && strpos($data[0], 'Комнат всего') > -1) {

                        $advert->rooms = $data[1] ? preg_replace("/[\D]/", "", explode('/', $data[1])[0]) : '';
                    }

                    if (!empty($data[0]) && strpos($data[0], 'Этаж') > -1) {

                        $advert->floor = $data[1] ?: '';
                    }

                    if (!empty($data[0]) && strpos($data[0], 'Область') > -1) {

                        $advert->region = $data[1] ?: '';
                    }

                    if (!empty($data[0]) && strpos($data[0], 'Населенный') > -1) {

                        $advert->city = $data[1] ?: '';
                    }
                }

            }
            try {
                $advert->save();

                $photoItems = $advPage->getElementById('object-gallery');
                $photoItems = $photoItems ? $this->getElementsByClass($photoItems, 'a', 'object-gallery-item') : null;

                $photoArray = [];

                /** @var DOMElement $photoItem */
                foreach ($photoItems as $photoItem) {
                    try {
                        if ($photoItem->getAttribute("data-src") !== null) {

                            $imgSrc = $photoItem->getAttribute("data-src");
                            
                            $advertImage = new AdvertImage();
                            $advertImage->imageUrl = $imgSrc;
                            $advertImage->advert_id = $advert->id;

                            $photoArray[] = $advertImage;


                        }
                    } catch (Exception $e) {
                        print($e->getMessage());
                    }
                }

                $advert->images()->saveMany($photoArray);


                printf("\nAdvert with url: %s was added\n", $advert->advertUrl);

                return $advert;

            } catch (QueryException $exception) {

                printf("\nError while saving advert with url: %s. %s \n", $advert->advertUrl, $exception->getMessage());
            }


        } catch (Exception $exception) {

            print($exception->getMessage());

        }

        return false;
    }

    /**
     * @param DOMElement $table
     * @return array
     */
    private
    function parseTable(DOMElement $table): array
    {

        //get all rows from the table
        $rows = $table->getElementsByTagName('tr');
        // get each column by tag name
        $cols = $rows->item(0)->getElementsByTagName('th');
        $row_headers = NULL;
        foreach ($cols as $node) {

            $row_headers[] = trim($node->nodeValue);
        }

        $tableData = array();

        $rows = $table->getElementsByTagName('tr');
        foreach ($rows as $row) {

            $cols = $row->getElementsByTagName('td');
            $row = array();
            $i = 0;
            foreach ($cols as $node) {
                # code...

                if ($row_headers == NULL) {
                    $row[] = $node->nodeValue;
                } else {
                    $row[$row_headers[$i]] = trim($node->nodeValue);
                }
                $i++;
            }
            $tableData[] = $row;
        }

        return $tableData;

    }

}
