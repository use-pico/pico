#!/usr/bin/env bash

docker build -t usepico/debian .
docker run -it --rm usepico/debian bash
