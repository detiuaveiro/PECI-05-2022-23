from typing import List
from flask import Flask, json, flash, request, redirect, url_for
import os
import uuid

from models.switch_connection import switch_connection

app = Flask(__name__)
UPLOAD_FOLDER = "./saves/"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return 'Welcome to controller api'

@app.route('/api/files/upload', methods=['POST'])
def upload_load():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and file.filename:
        filename = str(uuid.uuid4()) + file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return os.path.join(app.config['UPLOAD_FOLDER'], filename), 200
    return 'Unvalid File', 400

@app.route('/api/files', methods=['GET'])
def get_files():
    return [UPLOAD_FOLDER+file_name for file_name in os.listdir(UPLOAD_FOLDER)], 200

@app.route('/api/files/delete', methods=['DELETE'])
def delete_file():
    try:
        os.remove(request.form['file_path'])
        return '', 200
    except:
        return 'Error deleting file', 400

@app.route('/api/deploy', methods=['POST'])
def deploy_to_device():
    p4info_file_path : str = request.form['p4info_file_path']
    bmv2_file_path : str = request.form['bmv2_file_path']
    switches : List[switch_connection] = json.loads(request.form['devices'])

    #call controller library function to deploy


    #return result
    return '', 200




app.run(host='0.0.0.0', port=6000)