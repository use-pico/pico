FROM leightcore/alpine

RUN \
    apk update && \
    apk add --no-cache \
      openssh

ADD rootfs /

RUN \
    chmod 0600 -R /etc/ssh && \
    chmod 600 -R /root/.ssh && \
    echo 'root:1234' | chpasswd

WORKDIR /root
