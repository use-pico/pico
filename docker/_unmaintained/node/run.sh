#!/usr/bin/env bash

docker build -t usepico/node .
docker run -it --rm usepico/node bash
