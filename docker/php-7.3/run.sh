#!/usr/bin/env bash
set -e

docker build -t usepico/php:7.3 .
docker run -it --rm usepico/php:7.3 bash
