#!/bin/bash

set -e

echo "Building PHP 7.3 Docker image..."

# Build the image
docker build -t pico-php-7.3 .

echo "Build completed successfully!"
echo ""
echo "To run the container:"
echo "docker run -d -p 8080:80 -p 2222:22 --name php-7.3-light pico-php-7.3-lightweight"
echo ""
echo "To test:"
echo "curl http://localhost:8080/"
echo "curl http://localhost:8080/test.html"
echo "curl http://localhost:8080/any-non-existent-path"
echo ""
echo "To SSH into the container:"
echo "ssh root@localhost -p 2222"
echo "Password: 1234"
echo "Note: You'll see an informative MOTD when you connect!"
echo ""
echo "For automated SSH (requires sshpass):"
echo "sshpass -p '1234' ssh -o StrictHostKeyChecking=no -p 2222 root@localhost"
echo ""
echo "PHP Configuration Scripts:"
echo "  • php-dev  - Enable development mode (Xdebug, Mailhog)"
echo "  • php-prod - Enable production mode (disable debugging)" 
