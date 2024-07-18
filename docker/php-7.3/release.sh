#!/usr/bin/env bash
set -e

docker build -t usepico/php:7.3 .
docker push usepico/php:7.3
