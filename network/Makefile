BUILD_DIR = build
PCAP_DIR = pcaps
LOG_DIR = logs

all: run

run: build
	sudo python3 build_environment.py -t topology.json -b simple_switch_grpc

build: dirs

dirs:
	mkdir -p $(BUILD_DIR) $(PCAP_DIR) $(LOG_DIR)

stop:
	sudo mn -c

clean: stop
	rm -f *.pcap
	rm -rf $(BUILD_DIR) $(PCAP_DIR) $(LOG_DIR)
