#!/bin/sh
set -e

cd /app

composer install --no-ansi --no-dev --no-interaction  --optimize-autoloader

php artisan migrate --force

php artisan clear-compiled

php artisan config:cache

php artisan route:cache

exec /usr/bin/supervisord -n -c /etc/supervisord.conf
/usr/local/bin/docker-php-ext-configure sockets
/usr/local/bin/docker-php-ext-install sockets
supervisorctl restart

exec "$@"
