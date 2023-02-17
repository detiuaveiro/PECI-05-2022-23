import requests
import json
import os
from zipfile import ZipFile

url = 'http://127.0.0.1:5000/compile'
p4_file = "basic.p4"

# Set of parameters accepted by the p4 compiler
params = {
    'help': False,                          # Standalone option
    'target-help': False,                   # Standalone option
    'target': 'bmv2',                       # Obligatory parameter
    'arch': 'v1model',                      # Obligatory parameter
    'p4runtime-files': 'basic.p4info.txt',  # Optional parameter
    'std': False,                           # Optional parameter
}
files = {
    'params': (None, json.dumps(params), 'application/json'),
    'file': (os.path.basename(p4_file), open(p4_file, 'rb'), 'application/octet-stream')
}

# Posting request to compiler
r = requests.post(url, files=files)

# Write .zip file received
filename = 'response.zip'
open(filename, 'wb').write(r.content)

# Extract files inside .zip file to /response directory
with ZipFile(filename, 'r') as zip:
    zip.extractall(path="./response")

# Erase .zip file
os.system(f"rm {filename}")
