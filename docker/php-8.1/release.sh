#!/usr/bin/env bash
set -e

docker build -t leightcore/php:8.1 .
docker push leightcore/php:8.1
