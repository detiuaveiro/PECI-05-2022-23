#!/usr/bin/env sh
for idx in 0 1 2 3 4 5 6 7 8; do
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

simple_switch_grpc --no-p4 -i 10@intf1 -i 11@intf2 -i 12@intf2 -- --cpu-port ${CPU_PORT}