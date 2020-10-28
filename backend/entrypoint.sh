#!/bin/sh
set -e

php artisan migrate --force
php artisan key:generate
php artisan clear-compiled
php artisan config:cache
php artisan route:cache

exec "$@"
