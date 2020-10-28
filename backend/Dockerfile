FROM php:7.4-fpm

ENV DOCKERIZE_VERSION 0.6.1

# Install dockerize so we can wait for containers to be ready
RUN curl -s -f -L -o /tmp/dockerize.tar.gz https://github.com/jwilder/dockerize/releases/download/v$DOCKERIZE_VERSION/dockerize-linux-amd64-v$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf /tmp/dockerize.tar.gz \
    && rm /tmp/dockerize.tar.gz

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    git \
    cron \
    vim \
    libmemcached-dev \
    libz-dev \
    libpq-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    libssl-dev \
    libmcrypt-dev \
    libzip-dev \
    unzip \
    zip \
    nodejs \
    && docker-php-ext-configure gd \
    && docker-php-ext-configure zip \
    && docker-php-ext-install \
    gd \
    exif \
    opcache \
    pdo_mysql \
    pdo_pgsql \
    pcntl \
    zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir -p /app/

RUN groupadd -g 1000 www

RUN useradd -u 1000 -ms /bin/bash -g www www

COPY ./ /app

COPY --chown=www:www . /app

WORKDIR /app

RUN chmod +x /app/entrypoint.sh

RUN chmod +x /app/artisan

COPY ./laravel.ini /usr/local/etc/php/conf.d/laravel.ini

ADD schedule/crontab /etc/cron.d/cron

RUN chmod 0644 /etc/cron.d/cron

USER www

EXPOSE 9000

ENTRYPOINT ["/app/entrypoint.sh"]
