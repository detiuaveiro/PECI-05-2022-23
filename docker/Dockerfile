FROM p4lang/behavioral-model:latest
LABEL mantainer="David Araújo <davidaraujo.github.io"

RUN apt-get update && \
    apt-get install -y iproute2 iputils-ping

EXPOSE 9559

COPY . .

RUN chmod +x start_switch.sh

ENTRYPOINT ./start_switch.sh 