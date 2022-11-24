#include <core.p4>
#include <v1model.p4>

#include "header.p4"
#include "parser.p4"

control Ingress(
    inout headers hdr,
    inout metadata meta,
    inout standard_metadata_t
){
    action _drop() {
        mark_to_drop(standard_metadata);
    }

    action ipv4_forward(macAddr_t dstAddr, egressSpec_t port){
        standard_metadata.egress_spec = port;
        hdr.ethernet.srcAddr = hdr.ethernet.dstAddr;
        hdr.ethernet.dstAddr = dstAddr;
        hdr.ipv4.ttl = hdr.ipv4.ttl - 1;
    }

    table ipv4_lpm{
        key = {
            hdr.ipv4.dstAddr = lpm;
        }
        actions = {
            ipv4_forward;
            _drop;
            NoAction;
        }
        size = 1024;
        default_action = _drop();
    }

    apply{
        if(hdr.ipv4.isValid()){
            ipv4_lpm.apply();
        }
    }
}

control Egress(
    inout headers hdr,
    inout metadata meta,
    inout standard_metadata_t standard_metadata
){
    apply{}
}

V1Switch(
    Parser(),
    Deparser(),
    verifyChecksum(),
    computeChecksum(),
    Ingress(), 
    Egress(), 
) main;
