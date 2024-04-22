FROM debian:buster as pico-debian

ENV \
    DEBIAN_FRONTEND=noninteractive

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        ca-certificates curl git supervisor bash && \
    curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        nodejs && \
    npm install -g npm && \
    npm install -g pnpm && \
    npm install -g yarn && \
    mkdir -p /etc/supervisor/conf.d

CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

WORKDIR /root

FROM pico-debian as pico-php-base

COPY --from=composer /usr/bin/composer /usr/local/bin/composer

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        nginx make xz-utils libc-client-dev libzip-dev libsodium-dev libargon2-dev libreadline-dev

FROM pico-php-base as build

# setup mandatory environment variables
ENV \
    PHP_INI_DIR=/usr/local/etc/php \
    PHP_VERSION=7.3.33

WORKDIR /usr/src

RUN \
    curl -SLk "https://php.net/get/php-$PHP_VERSION.tar.xz/from/this/mirror" | tar -Jx --strip-components=1

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        gcc g++ libc6-dev autoconf \
        curl \
        libxml2-dev libssl-dev libkrb5-dev zlib1g-dev libbz2-dev libcurl4-openssl-dev libgmp-dev libpng-dev libxslt-dev libldap2-dev libsasl2-dev

RUN \
    ./configure \
        --with-config-file-path="$PHP_INI_DIR" \
        --with-config-file-scan-dir="$PHP_INI_DIR/conf.d" \
        --enable-fpm \
        --with-fpm-user=www-data \
        --with-fpm-group=www-data \
        --disable-cgi \
        --with-pdo_mysql \
        --with-mysqli \
        --with-curl \
        --with-bz2 \
        --enable-dba \
        --enable-exif \
        --enable-ftp \
        --enable-soap \
        --with-pear \
        --with-gd \
        --with-gettext \
        --enable-phar \
        --with-gmp \
        --with-imap \
        --with-imap-ssl \
        --with-kerberos \
        --with-mhash \
        --enable-intl \
        --enable-sockets \
        --with-sodium \
        --with-password-argon2 \
        --with-xsl \
        --enable-zip \
        --enable-mbstring \
        --with-openssl \
        --with-system-ciphers \
        --enable-bcmath \
        --enable-calendar \
        --with-readline \
        --with-zlib \
        --with-ldap \
        --with-ldap-sasl

RUN	make -j"$(nproc)"
RUN make install
RUN \
    /usr/src/build/shtool install -c ext/phar/phar.phar /usr/local/bin/phar.phar && \
	ln -s -f phar.phar /usr/local/bin/phar && \
    mkdir -p /usr/local/etc/php/conf.d/ && \
    chmod +x -R /usr/local/bin

RUN pecl channel-update pecl.php.net && pecl install xdebug-3.1.6

# start a new, clean stage (without any heavy dependency)
FROM pico-php-base as runtime

# take built binaries from build
COPY --from=build /usr/local/bin/php /usr/local/bin/php
COPY --from=build /usr/local/sbin/php-fpm /usr/local/sbin/php-fpm
COPY --from=build /usr/local/etc/php/conf.d/ /usr/local/etc/php/conf.d/
COPY --from=build /usr/local/lib/php/ /usr/local/lib/php/
COPY --from=build /usr/local/etc/ /usr/local/etc/

ADD rootfs /

RUN \
    chmod +x -R /usr/local/bin && \
    php -v && \
    php -m && \
    nginx -t && \
    node -v && \
    npm -v

# Creates one commonly used app folder
WORKDIR /opt/app
# defualt work directory for an application
WORKDIR /var/www
