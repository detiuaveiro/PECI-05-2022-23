BUILD_DIR = build
PCAP_DIR = pcaps
LOG_DIR = logs

source = $(wildcard *.p4)
compiled_json := $(source:.p4=.json)

ifndef DEFAULT_PROG
DEFAULT_PROG = $(wildcard *.p4)
endif
DEFAULT_JSON = $(BUILD_DIR)/$(DEFAULT_PROG:.p4=.json)

all: run

run: build
	sudo python3 run_exercise.py -t topology.json -b simple_switch_grpc -j $(DEFAULT_JSON)

stop:
	sudo mn -c

build: dirs $(compiled_json)

dirs:
	mkdir -p $(BUILD_DIR) $(PCAP_DIR) $(LOG_DIR)

%.json: %.p4
	p4c-bm2-ss --p4v 16 --p4runtime-files build/$(basename $@).p4.p4info.txt -o build/$@ $<

clean: stop
	rm -f *.pcap
	rm -rf $(BUILD_DIR) $(PCAP_DIR) $(LOG_DIR)
