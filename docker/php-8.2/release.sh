#!/usr/bin/env bash
set -e

docker build -t usepico/php:8.2 .
docker push usepico/php:8.2
