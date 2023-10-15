# Docker compose

```yaml
version: '3.4'
services:
    devbox:
        image: leightcore/devbox
        volumes:
            - "\\\\wsl.localhost\\Ubuntu\\mnt\\wslg:/tmp"
            - "config:/root/.config"
            - "local:/root/.local"
            - "ssh:/root/.ssh"
            - "devbox:/home/devbox"

volumes:
    config:
    local:
    ssh:
    devbox:
```
