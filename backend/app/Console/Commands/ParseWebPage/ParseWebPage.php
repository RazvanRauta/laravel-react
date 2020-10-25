<?php

namespace App\Console\Commands\ParseWebPage;

use App\Console\Commands\ParseWebPage\Parser\Parser;
use App\Models\ParserStatus;
use Illuminate\Console\Command;

class ParseWebPage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rr:parse-web-page {startingPageNumber?} {maxNumberOfPages?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parsing Web Pages';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $parserStatus = ParserStatus::find(1);
        if (!$parserStatus) {
            $parserStatus = new ParserStatus();
            $parserStatus->working = true;
            $parserStatus->save();
        } else if (!$parserStatus->working) {
            $parserStatus->working = true;
            $parserStatus->save();
        } else if ($parserStatus->working) {
            print("\n\nParsing is active!\n\n");
            return 0;
        }


        $startingPageNumber = $this->argument('startingPageNumber') ?: 0;
        $maxNumberOfPages = $this->argument('maxNumberOfPages') ?: 3;
        print("\nParser has started with: \n");

        if ($startingPageNumber !== null) {
            print("\nStarting Page Number: $startingPageNumber \n");
        }
        if ($maxNumberOfPages !== null) {
            print("\nMax Number Of Pages: $maxNumberOfPages \n");
        }

        $parser = new Parser('https://realt.by/rent/flat-for-day', $startingPageNumber, $maxNumberOfPages);
        $parser->parse();

        print("\n\nParsing has finished!\n\n");

        $parserStatus = ParserStatus::find(1);
        $parserStatus->working = false;
        $parserStatus->save();

        return 0;
    }
}
