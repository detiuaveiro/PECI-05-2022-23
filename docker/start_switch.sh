#!/usr/bin/env sh

PORT_NUM=$1     # Number of ports of the switch
GRPC_PORT=$2    # gRPC port number

INTFS_ARG=""
for idx in $(seq 0 $PORT_NUM); do
    port0=$(($idx*2))
    port1=$(($idx*2+1))

    intf0="veth$port0"
    intf1="veth$port1"

    if ! ip link show $intf0 &> /dev/null; then
        ip link add name $intf0 type veth peer name $intf1
        ip link set dev $intf0 up
        ip link set dev $intf1 up

        ip link set $intf0 mtu 1500
        ip link set $intf1 mtu 1500

        sysctl net.ipv6.conf.${intf0}.disable_ipv6=1
        sysctl net.ipv6.conf.${intf1}.disable_ipv6=1

        INTFS_ARG="$INTFS_ARG-i $port0@$intf0 -i $port1@$intf1 "
    fi
done

simple_switch_grpc --no-p4 $INTFS_ARG-- --grpc-server-addr 0.0.0.0:$GRPC_PORT