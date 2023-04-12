#!/usr/bin/env bash
for idx in 0 1 2 3 4 5 6 7 8; do
    intf0="veth$(($idx*2))"
    intf1="veth$(($idx*2+1))"
    if ! ip link show $intf0 &> /dev/null; then
        sudo ip link add name $intf0 type veth peer name $intf1
        sudo ip link set dev $intf0 up
        sudo ip link set dev $intf1 up

        # Set the MTU of these interfaces to be larger than default of
        # 1500 bytes, so that P4 behavioral-model testing can be done
        # on jumbo frames.
        sudo ip link set $intf0 mtu 9500
        sudo ip link set $intf1 mtu 9500

        # Disable IPv6 on the interfaces, so that the Linux kernel
        # will not automatically send IPv6 MDNS, Router Solicitation,
        # and Multicast Listener Report packets on the interface,
        # which can make P4 program debugging more confusing.
        #
        # Testing indicates that we can still send IPv6 packets across
        # such interfaces, both from scapy to simple_switch, and from
        # simple_switch out to scapy sniffing.
        #
        # https://superuser.com/questions/356286/how-can-i-switch-off-ipv6-nd-ra-transmissions-in-linux
        sudo sysctl net.ipv6.conf.${intf0}.disable_ipv6=1
        sudo sysctl net.ipv6.conf.${intf1}.disable_ipv6=1
    fi
done