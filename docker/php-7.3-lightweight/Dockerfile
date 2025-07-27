FROM debian:bullseye-slim

ENV \
    DEBIAN_FRONTEND=noninteractive

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
        php7.3-json php7.3-intl php7.3-gettext php7.3-bz2 php7.3-exif

# Install Xdebug, Composer, Node.js LTS, and Bun
RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests php7.3-xdebug && \
    phpenmod xdebug && \
    # Install Composer
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    # Install Node.js LTS
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y --no-install-recommends --no-install-suggests nodejs unzip && \
    # Install Bun
    curl -fsSL https://bun.sh/install | bash && \
    ln -s /root/.bun/bin/bun /usr/local/bin/bun && \
    # Clean up unnecessary packages (safer approach)
    apt-get remove -y software-properties-common apt-transport-https lsb-release gnupg2 && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    # Remove documentation and man pages to save space (safer)
    rm -rf /usr/share/doc/* && \
    rm -rf /usr/share/man/* && \
    rm -rf /var/cache/apt/* && \
    rm -rf /tmp/* && \
    rm -rf /var/tmp/*
    # Keep all timezone data (essential for PHP applications)
    # Keep all locale data (essential for internationalization)

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
    caddy version && \
    node --version && \
    npm --version && \
    bun --version

# Final cleanup - safer approach
RUN \
    apt-get update && \
    # Only remove packages that are definitely not needed
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Default work directory
WORKDIR /var/www

# Expose ports
EXPOSE 80 22

# Start supervisor
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"] 
