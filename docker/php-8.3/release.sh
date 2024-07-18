#!/usr/bin/env bash
set -e

docker build -t usepico/php:8.3 .
docker push usepico/php:8.3
