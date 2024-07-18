#!/usr/bin/env bash
set -e

docker build -t usepico/php:base .
docker run -it --rm usepico/php:base bash
