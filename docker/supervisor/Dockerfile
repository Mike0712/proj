FROM php:8.0-fpm

COPY wait-for-it.sh /usr/bin/wait-for-it

RUN chmod +x /usr/bin/wait-for-it

RUN apt-get update && \
    apt-get install -y --no-install-recommends librabbitmq-dev libmagickwand-dev libssl-dev zlib1g-dev curl git unzip netcat libxml2-dev libpq-dev libzip-dev supervisor && \
    pecl install apcu && \
    docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
    docker-php-ext-install -j$(nproc) zip opcache intl pdo_pgsql pgsql dom && \
    docker-php-ext-enable apcu pdo_pgsql sodium && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
	
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions amqp imagick

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www


CMD composer i -o ;  wait-for-it rabbit:5672

RUN mkdir -p /var/log/supervisor\
#    && ln -s /dev/stdout /var/log/supervisor/supervisord.log \
    && touch /var/log/supervisor/supervisord.log \
    && chmod 777 /var/log/supervisor/supervisord.log


CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
