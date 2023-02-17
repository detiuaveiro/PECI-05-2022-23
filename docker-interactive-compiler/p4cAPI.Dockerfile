FROM p4lang/p4c:latest
LABEL mantainer="David Araújo <davidaraujo.github.io"

EXPOSE 5000

RUN apt-get update
COPY api .

RUN apt-get -y install python3-pip
RUN pip3 install -r requirements.txt

ENTRYPOINT python3 server.py