#!/usr/bin/env bash
set -e

docker build -t leightcore/php:8.1 .
docker run -it --rm leightcore/php:8.1 bash
