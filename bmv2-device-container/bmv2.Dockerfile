FROM p4lang/behavioral-model:latest
LABEL mantainer="David Araújo <davidaraujo.github.io"

WORKDIR /behavioral-model/

ENV IP=192.168.1.101
ENV CPU_PORT=1

# TODO - Create virtual interfaces to bind to the swicth

RUN echo "#!/bin/sh \n simple_switch_grpc --no-p4 -- --grpc-server-addr ${IP}:9559 --cpu-port ${CPU_PORT}\n" > entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
