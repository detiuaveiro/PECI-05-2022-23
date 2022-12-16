import socket, sys

srv_addr = (sys.argv[1], int(sys.argv[2]))

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

for i in range(8):
    msg = "Packet {packet}".format(packet=i)
    sock.sendto(msg, srv_addr)
    data, addr = sock.recvfrom(1024)
    if data=="server":
        print("Packet {packet} received".format(packet=i))
    else:
        print("Packet {packet} reflected".format(packet=i))

sock.close()
