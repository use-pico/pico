FROM debian:12-slim

ENV \
    DEBIAN_FRONTEND=noninteractive

RUN \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        openssh-server ca-certificates curl supervisor bash cron sendmail zip unzip xz-utils openssl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
        nodejs && \
    npm install -g npm && \
    npm install -g bun && \
    mkdir -p /etc/supervisor/conf.d

ADD rootfs /

RUN \
    echo 'root:1234' | chpasswd && \
    chmod 600 -R /etc/ssh && \
    chmod 600 -R /root/.ssh && \
    chmod +x -R /usr/local/bin && \
    mkdir -p /var/run/sshd && \
    chmod 0755 -R /var/run/sshd

WORKDIR /root

CMD ["supervisord", "-c", "/etc/supervisor/supervisord.conf"]
