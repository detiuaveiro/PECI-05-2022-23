FROM p4lang/behavioral-model:latest
LABEL mantainer="David Araújo <davidaraujo.github.io"

ENV NET_TOOLS iputils-arping \
    iputils-ping \
    iputils-tracepath \
    net-tools \
    nmap \
    python-ipaddr \
    python-scapy \
    tcpdump \
    traceroute \
    tshark
ENV MININET_DEPS automake \
    build-essential \
    cgroup-bin \
    ethtool \
    gcc \
    help2man \
    iperf \
    iproute \
    libtool \
    make \
    pkg-config \
    psmisc \
    socat \
    ssh \
    sudo \
    telnet \
    pep8 \
    pyflakes \
    pylint \
    python-pexpect \
    python-setuptools

# Ignore questions when installing with apt-get:
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get install -y --no-install-recommends $NET_TOOLS $MININET_DEPS

COPY . .

ENTRYPOINT ["make", "run", "source="]