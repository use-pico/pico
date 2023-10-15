FROM alpine

RUN \
    apk update && \
    apk add --no-cache \
      supervisor bash

RUN mkdir -p /etc/supervisor/conf.d

ADD rootfs /

CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]

WORKDIR /root
