#!/usr/bin/env bash
set -e

docker build -t usepico/php:8.2 .
docker run -it --rm usepico/php:8.2 bash
