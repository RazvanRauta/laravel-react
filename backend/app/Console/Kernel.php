<?php

namespace App\Console;

use App\Console\Commands\ParseWebPage\ParseWebPage;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\App;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        ParseWebPage::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $fileLocation = '/var/log/laravel-scheduler.log';
        if (App::environment('local')) {
            $fileLocation = 'storage/logs/laravel.log';
        }

        $schedule->command('rr:parse-web-page')->twiceDaily(13, 19)->appendOutputTo($fileLocation);
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
