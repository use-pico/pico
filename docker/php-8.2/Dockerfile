FROM usepico/php:base as build

# setup mandatory environment variables
ENV \
    PHP_INI_DIR=/usr/local/etc/php \
    PHP_VERSION=8.2.18

WORKDIR /usr/src

RUN \
    curl -SLk "https://php.net/get/php-$PHP_VERSION.tar.xz/from/this/mirror" | tar -Jx --strip-components=1 && \
    ./configure --help && \
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
		--with-ldap-sasl \
	&& make -j"$(nproc)" \
	&& make install \
	&& /usr/src/build/shtool install -c ext/phar/phar.phar /usr/local/bin/phar.phar \
	&& ln -s -f phar.phar /usr/local/bin/phar && \
    mkdir -p /usr/local/etc/php/conf.d/ && \
    chmod +x -R /usr/local/bin && \
    pecl install xdebug && \
    pecl install memcached

# start a new, clean stage (without any heavy dependency)
FROM usepico/php:base as runtime

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
