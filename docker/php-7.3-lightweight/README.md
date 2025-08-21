# PHP 7.3 Docker Setup

This Docker setup provides a modern PHP 7.3 environment using **Caddy** as a web server instead of traditional heavy web servers like Apache or Nginx.

## Features

- **PHP 7.3** with FPM (FastCGI Process Manager)
- **Caddy** as a modern web server with native PHP support
- **Static file serving** for existing files
- **PHP routing** - non-existent requests are forwarded to `/index.php`
- **SSH server** for remote access with informative MOTD
- **Supervisor** for process management
- **All major PHP extensions** included
- **Xdebug** configured for development with logs exposed to Docker stdout

## Architecture

### Web Server: Caddy
- **Native PHP-FPM support** - no additional modules needed
- Serves static files directly (HTML, CSS, JS, images, etc.)
- Handles PHP requests via FastCGI to PHP-FPM
- Built-in routing with `try_files` directive
- Much lighter than Apache/Nginx
- Automatic HTTPS support (if needed)

### PHP Processing: PHP-FPM
- Runs PHP 7.3 with FastCGI
- Socket communication with Caddy web server
- Process management for optimal performance

## Quick Start

### Build the Image
```bash
cd docker/php-7.3-lightweight
./build.sh
```

### Run the Container
```bash
docker run -d -p 8080:80 -p 2222:22 --name php-7.3-light pico-php-7.3-lightweight
```

### Test the Setup
```bash
# Test PHP functionality
curl http://localhost:8080/

# Test static file serving
curl http://localhost:8080/test.html

# Test routing (should forward to index.php)
curl http://localhost:8080/any-non-existent-path
```

## Configuration

### Caddy Configuration
The Caddyfile (`/etc/caddy/Caddyfile`) is very simple:
```caddyfile
http://localhost {
    root * /var/www/public
    php_fastcgi unix//run/php/php7.3-fpm.sock
    file_server {
        browse off
    }
    try_files {path} {path}/ /index.php?{query}
    log {
        output file /var/log/caddy/access.log
        format json
        level INFO
    }
}
```

**Features:**
- **Directory listing disabled** - `browse off` prevents directory browsing
- **Standard routing** - Uses `try_files` with query parameters for SPA-style routing
- **Structured logging** - JSON format logs for easy parsing
- **Access logging** - All requests logged to `/var/log/caddy/access.log`

### Environment Variables
- `PORT` - Web server port (default: 80)
- `DOCUMENT_ROOT` - Document root path (default: `/var/www/public`)
- `PHP_FPM_SOCKET` - PHP-FPM socket path (default: `/run/php/php7.3-fpm.sock`)

### File Structure
```
/var/www/public/          # Document root
├── index.php             # Main PHP entry point
├── test.html             # Static HTML test file
└── ...                   # Your application files
```

## Port Mapping

The container exposes the following ports:

- **Port 80** → **Host 8080** - Web server (Caddy)
- **Port 22** → **Host 2222** - SSH server

## Services

The container runs the following services managed by Supervisor:

1. **SSH Server** - For remote access (port 22)
2. **PHP-FPM** - PHP FastCGI Process Manager
3. **Caddy Web Server** - Modern web server with native PHP support (port 80)
4. **Direct Logging** - All services write to Docker stdout/stderr

## PHP Extensions Included

- pdo_mysql, mysqli
- curl, bz2, exif, ftp, soap
- gd, gettext, gmp, imap
- intl, sockets, zip, mbstring
- bcmath, calendar, readline, ldap
- xdebug (for development)

## PHP Configuration Management

### Development/Production Mode Scripts
The container includes scripts to easily switch between development and production modes:

**Development Mode:**
```bash
php-dev
```
- Enables Xdebug for debugging
- Enables Mailhog for email testing
- Restarts PHP-FPM automatically

**Production Mode:**
```bash
php-prod
```
- Disables Xdebug for better performance
- Disables Mailhog
- Restarts PHP-FPM automatically

### PHP Configuration Files
- **Memory Limit**: 2GB (`memory-limit.ini`)
- **Upload Limits**: 8MB max file size, 8MB post size (`upload-limit.ini`)
- **OPcache**: Enabled for performance (`opcache.ini`)
- **CGI**: Path info fix disabled (`cgi.ini`)
- **Xdebug**: Configurable debugging (`xdebug.ini.disabled`)
- **Mailhog**: Email testing configuration (`mailhog.ini.disabled`)

## Production Considerations

⚠️ **Important Security Note**: This container is designed for **performance optimization**, not real production deployment. It includes several features that make it unsuitable for production environments:

- **SSH Server**: Exposed with simple password authentication (`root:1234`)
- **Development Tools**: Xdebug and debugging features enabled by default
- **Internal Services**: Designed for development/testing workflows
- **No Security Hardening**: Not configured for production security standards

**Use Cases:**
- Development environments
- Testing and staging servers
- Performance-optimized local development
- CI/CD pipelines where security is not a concern

**For Real Production:**
- Remove SSH server
- Disable debugging features
- Implement proper security measures
- Use production-grade web servers and configurations

## Advantages Over Traditional Setup

1. **Lighter Weight**: Caddy is much smaller than Apache/Nginx
2. **Native PHP Support**: Built-in PHP-FPM support, no modules needed
3. **Simpler Configuration**: Just 5 lines in Caddyfile vs complex web server configs
4. **Modern Architecture**: Uses FastCGI for PHP communication
5. **Automatic HTTPS**: Built-in Let's Encrypt support if needed
6. **Better Performance**: Optimized for modern web applications

## Comparison with Previous Bun Setup

| Aspect | Bun Setup | Caddy Setup |
|--------|-----------|-------------|
| **Complexity** | ~400 lines of custom code | 5 lines of config |
| **Maintenance** | High (custom FastCGI impl) | Low (battle-tested) |
| **PHP Support** | Custom implementation | Native support |
| **Performance** | Good | Excellent |
| **Security** | Basic | Enterprise-grade |
| **Features** | Basic routing | Full web server features |

## Troubleshooting

### Check Service Status
```bash
docker exec php-7.3-light supervisorctl status
```

### View Logs
```bash
# All logs are written to Docker stdout/stderr
docker logs php-7.3-light

# Follow logs in real-time
docker logs -f php-7.3-light

# View last N lines
docker logs --tail 100 php-7.3-light

# Filter logs by service
docker logs php-7.3-light | grep sshd
docker logs php-7.3-light | grep php-fpm
docker logs php-7.3-light | grep "handled request"

# Check service status
docker exec php-7.3-light supervisorctl status
```

### Log Structure
All logs are now written directly to Docker's stdout/stderr for better container integration:

**Docker Logs:**
```bash
docker logs php-7.3-light
```

**Log Sources:**
- **Caddy**: Web server logs (console format)
- **PHP-FPM**: PHP process logs (direct to stderr)
- **SSH**: SSH server logs (direct to stderr)
- **Supervisor**: Process management logs

**Benefits:**
- ✅ All logs captured by Docker
- ✅ No log files to manage
- ✅ Real-time log streaming
- ✅ Standard Docker logging practices
- ✅ Easy log aggregation and monitoring

### SSH Access
```bash
# SSH into the container
ssh root@localhost -p 2222
# Password: 1234

# SFTP with sshpass
sshpass -p '1234' sftp -o StrictHostKeyChecking=no -P 2222 root@localhost
```

**MOTD (Message of the Day)**: When you connect via SSH, you'll see a comprehensive welcome message displaying:
- Container information and services
- Quick commands for common tasks
- Log viewing instructions
- Service status commands

## Customization

### Adding Custom PHP Configuration
Create a custom `php.ini` file and mount it:
```bash
docker run -d -p 8080:80 \
  -v /path/to/custom/php.ini:/etc/php/7.3/fpm/php.ini \
  --name php-7.3-light pico-php-7.3-lightweight
```

### Mounting Application Code
```bash
docker run -d -p 8080:80 \
  -v /path/to/your/app:/var/www/public \
  --name php-7.3-light pico-php-7.3-lightweight
```

### Custom Caddy Configuration
```bash
docker run -d -p 8080:80 \
  -v /path/to/custom/Caddyfile:/etc/caddy/Caddyfile \
  --name php-7.3-light pico-php-7.3-lightweight
```

## Logging Features

### Comprehensive Logging System
- **Centralized logging** - All services log to a unified system
- **Structured logs** - JSON format for easy parsing and analysis
- **Automatic rotation** - Daily log rotation with compression
- **Easy debugging** - Built-in `view-logs` script for quick access
- **Service isolation** - Separate log files for each service

### Log Management
- **Rsyslog** - Centralized log collection and processing
- **Logrotate** - Automatic log rotation (daily, 7 days retention)
- **JSON formatting** - Caddy access logs in structured format
- **Real-time monitoring** - Live log viewing with `view-logs` script

### Debugging Tools
```bash
# Quick overview of all logs
docker exec php-7.3-light view-logs all 50

# Monitor specific service
docker exec php-7.3-light view-logs caddy 100

# Follow logs in real-time
docker exec php-7.3-light tail -f /var/log/docker.log
```

## Performance Notes

- Caddy web server is highly efficient for both static and dynamic content
- PHP-FPM provides excellent PHP performance with process management
- Socket-based communication between Caddy and PHP-FPM is fast
- Memory footprint is significantly smaller than Apache/Nginx setups
- Native PHP support means no overhead from custom implementations
- Comprehensive logging with minimal performance impact

## Security Considerations

- SSH server is enabled for development (change default password in production)
- PHP-FPM runs as www-data user
- Proper file permissions are set
- Caddy provides enterprise-grade security features
- Consider using environment variables for sensitive configuration

## Advanced Caddy Features

### Automatic HTTPS
To enable automatic HTTPS, simply change the Caddyfile:
```caddyfile
your-domain.com {
    root * /var/www/public
    php_fastcgi unix//run/php/php7.3-fpm.sock
    file_server
    try_files {path} {path}/ /index.php?{query}
}
```

### Reverse Proxy
Caddy can also act as a reverse proxy:
```caddyfile
localhost {
    reverse_proxy localhost:3000
}
```

### Multiple Sites
```caddyfile
site1.localhost {
    root * /var/www/site1
    php_fastcgi unix//run/php/php7.3-fpm.sock
    file_server
}

site2.localhost {
    root * /var/www/site2
    php_fastcgi unix//run/php/php7.3-fpm.sock
    file_server
}
``` 
