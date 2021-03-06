<?php

namespace App\Mail;

use App\Models\Advert;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AddedAdverts extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var Advert[] $adverts
     */
    protected array $adverts;

    /**
     * Create a new message instance.
     *
     * @param Advert[] $adverts
     */
    public function __construct(array $adverts)
    {
        $this->adverts = $adverts;

    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('New Adverts')->markdown('emails.addedAdverts')->with(["adverts" => $this->adverts]);
    }
}
