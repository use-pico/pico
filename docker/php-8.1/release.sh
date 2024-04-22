#!/usr/bin/env bash
set -e

docker build -t usepico/php:8.1 .
docker push usepico/php:8.1
