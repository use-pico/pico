#!/usr/bin/env bash
set -e

docker build -t usepico/php:8.1 .
docker run -it --rm usepico/php:8.1 bash
