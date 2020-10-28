#!/bin/sh
set -e

cd /app

composer install --no-ansi --no-dev --no-interaction  --optimize-autoloader

php artisan migrate --force

php artisan clear-compiled

php artisan config:cache

php artisan route:cache

cron -f

exec "php-fpm"
