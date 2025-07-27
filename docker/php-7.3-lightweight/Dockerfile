FROM debian:bullseye-slim

ENV \
    DEBIAN_FRONTEND=noninteractive \
    PHP_VERSION=7.3.33

# Install system dependencies
RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        ca-certificates curl supervisor bash openssh-server \
        software-properties-common apt-transport-https lsb-release gnupg2 && \
    mkdir -p /etc/supervisor/conf.d

# Add Caddy repository and install Caddy
RUN \
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg && \
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests caddy

# Add Ondřej Surý's PHP PPA for PHP 7.3
RUN \
    curl -fsSL https://packages.sury.org/php/apt.gpg | gpg --dearmor -o /usr/share/keyrings/php.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/php.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        php7.3-fpm php7.3-cli php7.3-common php7.3-mysql php7.3-zip \
        php7.3-gd php7.3-mbstring php7.3-curl php7.3-xml php7.3-bcmath \
        php7.3-json php7.3-intl php7.3-soap php7.3-xsl php7.3-ldap \
        php7.3-imap php7.3-gettext php7.3-bz2 php7.3-exif php7.3-ftp \
        php7.3-gmp php7.3-readline php7.3-calendar php7.3-sockets

# Install Xdebug and clean up
RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests php7.3-xdebug && \
    phpenmod xdebug && \
    # Clean up unnecessary packages
    apt-get remove -y software-properties-common apt-transport-https lsb-release gnupg2 && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy configuration files
ADD rootfs /

# Set up permissions and PHP configurations
RUN \
    echo 'root:1234' | chpasswd && \
    mkdir -p /root/.ssh && \
    chmod 600 -R /etc/ssh && \
    chmod 600 -R /root/.ssh && \
    chmod +x -R /usr/local/bin && \
    chmod +x /usr/local/bin/php-dev && \
    chmod +x /usr/local/bin/php-prod && \
    mkdir -p /var/run/sshd && \
    chmod 0755 -R /var/run/sshd && \
    # Copy PHP configuration files to the correct location
    cp /usr/local/etc/php/conf.d/*.ini /etc/php/7.3/fpm/conf.d/ && \
    cp /usr/local/etc/php/conf.d/*.ini /etc/php/7.3/cli/conf.d/

# Create www-data user if it doesn't exist
RUN \
    if ! id www-data > /dev/null 2>&1; then \
        useradd -r -s /bin/false www-data; \
    fi

# Create necessary directories
RUN \
    mkdir -p /var/www/public && \
    mkdir -p /run/php && \
    chown -R www-data:www-data /var/www

# Test installations
RUN \
    php -v && \
    php -m && \
    caddy version

# Default work directory
WORKDIR /var/www

# Expose ports
EXPOSE 80 22

# Start supervisor
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"] 
