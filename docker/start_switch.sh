#!/usr/bin/env sh

PORT_NUM=$1     # Number of ports of the switch
GRPC_PORT=$2    # gRPC port number

for idx in $(seq $PORT_NUM); do
    intf0="veth$(($idx*2))"
    intf1="veth$(($idx*2+1))"
    if ! ip link show $intf0 &> /dev/null; then
        ip link add name $intf0 type veth peer name $intf1
        ip link set dev $intf0 up
        ip link set dev $intf1 up

        ip link set $intf0 mtu 9500
        ip link set $intf1 mtu 9500

        sysctl net.ipv6.conf.${intf0}.disable_ipv6=1
        sysctl net.ipv6.conf.${intf1}.disable_ipv6=1
    fi
done

INTFS_ARG=""
for idx in $(seq 0 $PORT_NUM); do
    INTFS_ARG="$INTFS_ARG -i $(($idx*2))@veth$(($idx*2)) -i $(($idx*2+1))@veth$(($idx*2+1))"
done

simple_switch_grpc --no-p4 $INTFS_ARG -- --grpc-server-addr 0.0.0.0:$GRPC_PORT &

PID=&! && sleep 10 & echo "P4Runtime Switch starter with PID: $!"