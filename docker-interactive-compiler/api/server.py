import os
import subprocess
from flask import *
from zipfile import ZipFile
from distutils.log import debug
from werkzeug.utils import secure_filename
app = Flask(__name__)

@app.route('/compile', methods=['POST'])
def upload_file():
    subprocess.run(["rm", "temp.zip"], stdout=subprocess.DEVNULL)

    if request.method == 'POST':
        try:
            
            file = request.files['file']

            # Securing original filename and writing file
            filename = secure_filename(file.filename)
            file.save(filename)

            # Creating compilation command with requested parameters
            params = json.loads(request.form['params'])

            if params['help']:
                return subprocess.run(["p4c", "--help"],
                                    stdout=subprocess.PIPE,
                                    text=True).stdout

            if params['target-help']:
                return subprocess.run(["p4c", "--target-help"],
                                    stdout=subprocess.PIPE,
                                    text=True).stdout

            command = f"p4c --target {params['target']} --arch {params['arch']}"

            if params['p4runtime-files']:
                command = command + " --p4runtime-files " + \
                    params['p4runtime-files']

            if params['std']:
                command = command + " --std " + params['std']

            command = command + " " + filename
            
            # Call compiler with the resulting command
            os.system(command)

            # Compressing compilation resulting files into a single file
            with ZipFile('temp.zip', 'w') as zip:
                if params['p4runtime-files']:
                    zip.write(params['p4runtime-files'])  # p4runtime config file
                zip.write(f"{filename[:filename.rfind('.')]}.p4i")
                zip.write(f"{filename[:filename.rfind('.')]}.json")

            # Removing produced and received files apart form .zip
            subprocess.run(["rm", filename], stdout=subprocess.DEVNULL)
            os.system(f"rm {filename[:filename.rfind('.')]}.p4i")
            os.system(f"rm {filename[:filename.rfind('.')]}.json")
            if params['p4runtime-files']:
                os.system(f"rm {params['p4runtime-files']}")

            return send_file('temp.zip')
        except:
            os.system(f"rm {filename}")
            os.system("rm temp.zip")
            return "Error"

if __name__ == '__main__':
    app.run(host='0.0.0.0')
