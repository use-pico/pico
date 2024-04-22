#!/usr/bin/env bash

docker build -t usepico/alpine .
docker run -it --rm usepico/alpine bash
