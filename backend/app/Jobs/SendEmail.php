<?php

namespace App\Jobs;

use App\Mail\AdvertAdded;
use App\Models\Advert;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Advert[] $adverts
     */
    public array $adverts;

    /**
     * Create a new job instance.
     *
     * @param Advert[] $adverts
     */
    public function __construct(array $adverts)
    {
        $this->adverts = $adverts;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $email = new AdvertAdded($this->adverts);
        $usersEmail = [];

        $users = User::all();

        foreach ($users as $user){
            $usersEmail[]=$user->email;
        }

        Mail::to($usersEmail)->send($email);

        print("\nEmail with new adverts was sent.\n");

    }
}