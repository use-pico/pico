#!/usr/bin/env bash
set -e

docker build -t usepico/php:8.3 .
docker run -it --rm usepico/php:8.3 bash
