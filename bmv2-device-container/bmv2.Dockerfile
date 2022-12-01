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
    apt-get install -y --no-install-recommends $NET_TOOLS $MININET_DEPS \
    apt install -y curl

RUN . /etc/os-release
RUN echo "deb http://download.opensuse.org/repositories/home:/p4lang/xUbuntu_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/home:p4lang.list
RUN curl -L "http://download.opensuse.org/repositories/home:/p4lang/xUbuntu_${VERSION_ID}/Release.key" | sudo apt-key add -
RUN sudo apt-get update && apt sudo install -y p4lang-p4c

COPY . .

ENV IP=0.0.0.0
ENV CPU_PORT=1
ENV iface1=iface_bmv2_1
ENV iface2=iface_bmv2_2

ENTRYPOINT [ "./simple_switch_grpc", "--no-p4", "--grpc-server-addr", "$(IP):9559", "--cpu-port", "$(CPU_PORT)", "-i","0@$(iface1)","-i","1@$(iface2)"]