FROM usepico/php:base as base

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        libc-client-dev libpq-dev libxml2-dev libpng-dev libwebp-dev \
        libjpeg-dev libxpm-dev libonig-dev libsodium-dev libargon2-dev \
        libxslt-dev libzip-dev libmemcached-dev

FROM base as build

ENV \
    PHP_INI_DIR=/usr/local/etc/php \
    PHP_VERSION=8.1.28

WORKDIR /usr/src

RUN \
    curl -SLk "https://php.net/get/php-$PHP_VERSION.tar.xz/from/this/mirror" | tar -Jx --strip-components=1

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        g++ libc6-dev pkg-config autoconf \
        libkrb5-dev libssl-dev libsqlite3-dev zlib1g-dev libbz2-dev libcurl4-openssl-dev \
        libgmp-dev libc-client-dev libldap2-dev libsasl2-dev \
        libreadline-dev

RUN \
    ./configure \
		--with-config-file-path="$PHP_INI_DIR" \
		--with-config-file-scan-dir="$PHP_INI_DIR/conf.d" \
		--enable-fpm \
		--with-fpm-user=www-data \
		--with-fpm-group=www-data \
		--disable-cgi \
		--with-pdo_mysql \
		--with-pdo_pgsql \
		--with-mysqli \
		--with-kerberos \
		--enable-shmop \
		--with-curl \
		--with-bz2 \
		--enable-dba \
		--enable-exif \
		--enable-ftp \
		--enable-soap \
		--with-pear \
		--enable-gd \
		--with-webp \
		--with-jpeg \
		--with-xpm \
		--enable-gd-jis-conv \
		--with-gettext \
		--enable-phar \
		--with-gmp \
		--with-imap \
		--with-imap-ssl \
		--with-mhash \
		--enable-intl \
		--enable-sockets \
		--with-sodium \
		--with-password-argon2 \
		--with-xsl \
		--with-zip \
		--enable-mbstring \
		--with-openssl \
		--with-system-ciphers \
		--enable-bcmath \
		--enable-calendar \
		--with-readline \
		--with-zlib \
		--with-ldap \
		--with-ldap-sasl

RUN \
	make -j"$(nproc)"

RUN \
	make install

RUN \
   pecl install xdebug && \
   pecl install memcached

RUN \
	/usr/src/build/shtool install -c ext/phar/phar.phar /usr/local/bin/phar.phar && \
	ln -s -f phar.phar /usr/local/bin/phar && \
    mkdir -p /usr/local/etc/php/conf.d/ && \
    chmod +x -R /usr/local/bin

# start a new, clean stage (without any heavy dependency)
FROM base as runtime

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
