FROM p4lang/behavioral-model:latest
LABEL mantainer="David Araújo <davidaraujo.github.io"

ENV NP4=true
ENV IP=192.168.1.101
ENV PORT=9559
ENV CPU_PORT=1
ENV IFACE0=ibmv2_0
ENV IFACE1=ibmv2_1


ENTRYPOINT simple_switch_grpc --no-p4 -i 0@${IFACE0} -i 0@${IFACE1} -- --grpc-server-addr ${IP}:${PORT} --cpu-port ${CPU_PORT}