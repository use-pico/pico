#!/usr/bin/env bash
set -e

# Build the image with the correct tag
docker build -t usepico/php:7.3 .

# Start interactive bash session
docker run -it --rm usepico/php:7.3 bash
