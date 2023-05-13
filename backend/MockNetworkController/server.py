from flask import Flask
import random

app = Flask(__name__)

@app.route("/api/switch/getcounters")
def get_counters():
    return  {
        "s1" : {
            "counters" : [
                {
                    "entries" : [
                        {
                            "byte_count" : str(random.randint(0, 1000000)),
                            "packet_count" : str(random.randint(0, 1000000)),
                            "index" : str(random.randint(0, 1000000))
                        }
                    ],
                    "id" : 124124214,
                    "name" : "MyIngress.ingressTunnelCounter"
                },
                {
                    "entries" : [
                        {
                            "byte_count" : str(random.randint(0, 1000000)),
                            "packet_count" : str(random.randint(0, 1000000)),
                            "index" : str(random.randint(0, 1000000))
                        }
                    ],
                    "id" : 4642314142,
                    "name" : "MyIngress.egressTunnelCounter"
                },
            ],
            "device_id" : 0,
        },
        "s2" : {
            "counters" : [
                {
                    "entries" : [
                        {
                            "byte_count" : str(random.randint(0, 1000000)),
                            "packet_count" : str(random.randint(0, 1000000)),
                            "index" : str(random.randint(0, 1000000))
                        }
                    ],
                    "id" : 231551523,
                    "name" : "MyIngress.ingressTunnelCounter"
                },
                {
                    "entries" : [
                        {
                            "byte_count" : str(random.randint(0, 1000000)),
                            "packet_count" : str(random.randint(0, 1000000)),
                            "index" : str(random.randint(0, 1000000))
                        }
                    ],
                    "id" : 424116612321,
                    "name" : "MyIngress.egressTunnelCounter"
                },
            ],
            "device_id" : 1,
        },
        "s3" : {
            "counters" : [
                {
                    "entries" : [
                        {
                            "byte_count" : str(random.randint(0, 1000000)),
                            "packet_count" : str(random.randint(0, 1000000)),
                            "index" : str(random.randint(0, 1000000))
                        }
                    ],
                    "id" : 612461143,
                    "name" : "MyIngress.ingressTunnelCounter"
                },
                {
                    "entries" : [
                        {
                            "byte_count" : str(random.randint(0, 1000000)),
                            "packet_count" : str(random.randint(0, 1000000)),
                            "index" : str(random.randint(0, 1000000))
                        }
                    ],
                    "id" : 6432512231,
                    "name" : "MyIngress.egressTunnelCounter"
                },
            ],
            "device_id" : 2,
        },
    }

@app.route("/api/switch/gettable")
def get_tables():
    return {

    }


if __name__ == "__main__":
    app.run( host='0.0.0.0')
