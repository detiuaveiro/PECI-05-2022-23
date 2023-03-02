FROM p4lang/behavioral-model:latest
LABEL mantainer="David Araújo <davidaraujo.github.io"

ENV NP4=true
ENV CPU_PORT=1
ENV IFACE0=if_10
ENV IFACE1=vif11
ENV IFACE2=vif12

RUN apt-get install -y net-tools

EXPOSE 9559

ENTRYPOINT simple_switch_grpc --no-p4 -i 10@${IFACE0} -i 11@${IFACE1} -i 12@${IFACE2} -- --cpu-port ${CPU_PORT}
