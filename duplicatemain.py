import json
import secrets
from zipfile import ZipFile
from flask import Flask, render_template, request, send_file, make_response, jsonify, Response, session
import os
import issm_log
from InitialIndex import indexFile, indexFile1
from addSignature import add_signature, add_signature1
from fitzsplit import splitsignature, sign_details
from login import checklogin, registeruser, forgotpassword1, users, userpopup, token_required
from name import names_list, signaturefile
from postToSlate import post
import datetime
import base64
from datetime import timedelta

from sendemail import get_credentials, send_email
from split import splitting
from totalpages import pages
import http
import time
import jwt

today = datetime.datetime.today()
date = today.strftime('%Y%m%d')
timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
log_folder = os.path.join(os.getcwd(), 'log')

cwd = os.getcwd()
app = Flask(__name__, template_folder=cwd, static_folder='static')

app.secret_key = secrets.token_bytes(32)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/getNames', methods=['GET', 'POST'])
def names():
    if request.method == 'GET':
        fullnames = names_list()
        names = fullnames.tolist()

        return jsonify({'names': names})


@app.route('/i20process', methods=['POST', 'GET'])
@token_required

def upload():
    if request.method == 'POST':
        try:
            print("upload1")

            Total_Pages = None
            Total_Files = None
            Total_Signatures = None
            zipmsg = None
            Split_Failure = None
            index_size = None
            missing_records = None
            index_error = None

            # issm_log.logger.log_filename=f'response_{timestamp}.log'
            # issm_log.set_new_log_file()

            pdf_file = request.files['i20File']
            issm_file = request.files['issmFile']
            slate_file = request.files['slateFile']
            pdf_filename = pdf_file.filename
            issm = issm_file.filename
            slate = slate_file.filename
            issm_file.save(issm)
            slate_file.save(slate)
            pdf_file.save(pdf_filename)
            name = request.form['dsoName']
            slaterequest = request.form['toSlate']
            i20type = request.form['i20Type']

            print(i20type)

            user = session.get('name')

            issm_log.logger.info(f"User logged in  :{user}")

            issm_log.logger.info(f"Intial I20. Received post request with files :{pdf_filename, issm, slate}")

            num_pages = pages(pdf_filename)
            sevid = ""
            try:
                length, width, xcoordinate, ycoordinate = sign_details(name)
                signature_file = signaturefile(name)
                sevid, totalpages, totalsigns = splitsignature(pdf_filename, signature_file, length, width, xcoordinate,
                                                               ycoordinate)

                # sevid, totalpagessplit = splitting(pdf_filename)
                totalpagessplit = totalpages / 3
                numberoffiles = totalpagessplit
                session['Total_Pages'] = f"{num_pages}"
                session['Total_Files'] = f"{int(numberoffiles)}"
                session['Total_Signatures'] = f"{totalsigns}"
                issm_log.logger.info(
                    f"Total Pages in i20: {num_pages}. Total Files after splitting: {int(numberoffiles)} Total signatures added are {totalsigns}")
            except Exception as e:
                session['Split_Failure'] = f"Splitting of file is failed {e}"
                issm_log.logger.error(f"Splitting of file is failed {e}")
            try:
                if i20type == 'initI20':
                    result = indexFile(sevid, issm, slate)
                elif (i20type == 'contdI20'):
                    result = indexFile1(sevid, issm, slate)
                if isinstance(result, tuple):
                    sizeOfIndexfile, missing = result
                    issm_log.logger.info(
                        f"Index file created successfully and size is {sizeOfIndexfile}.Record not included in Index but is in ISSM/Slate {missing}")
                    session["index_size"] = f"{sizeOfIndexfile}"
                    session["missing_records"] = f"{missing}"
                    print("Size of index file is ", sizeOfIndexfile)
                else:
                    msg = result
                    session["index_error"] = f"Index file creation failed {msg}"
                    issm_log.logger.error(f"Index file creation failed {msg}")
                # sizeOfIndexfile,missing=indexFile(sevid, issm, slate)
            except Exception as e:
                session["index_error"] = f"Index file creation failed {e}"
                issm_log.logger.error(f"Index file creation failed {e}")

            try:
                zip_filename = 'signed_files.zip'
                with ZipFile(zip_filename, 'w') as zip_file:
                    for filename in os.listdir('.'):
                        if filename.endswith('.pdf') and filename.startswith(
                                "N") and filename != pdf_filename and not filename.endswith(
                                "_unsigned.pdf") or filename == "index_" + date + ".xlsx" or filename == "index_" + date + ".txt":
                            zip_file.write(filename)
                response = make_response(send_file(zip_filename, as_attachment=True))
                response.headers['Content-Disposition'] = 'attachment; filename=signed_files.zip'
                response.headers['Content-Type'] = 'application/zip'
                issm_log.logger.info("Files Zipped")
                session['zipmsg'] = "Success"
                if slaterequest == 'y':
                    stream = request.form['program']
                    if stream == 'g':
                        output = post(zip_filename, 'GR')
                        issm_log.logger.info(f"Response of files to slate {output}, stream is {stream}")
                        print(output)

                    else:
                        print("goign to UG")
                        output = post(zip_filename, 'UG')
                        issm_log.logger.info(f"Response of files to slate {output}, stream is {stream}")
                        print(output)
            except Exception as e:
                session['zipmsg'] = f"Files Zipping failed {e}"
                issm_log.logger.error(f"Files Zipping failed {e}")

            # or ('index_' in file_name and file_name.endswith('.txt'))
            for file_name in os.listdir('.'):
                if file_name.endswith('.pdf') or file_name.endswith(
                        '.xlsx') and file_name != "user.xlsx" and not file_name.startswith(
                        'signature') and not file_name.endswith('.py'):
                    os.remove(file_name)
            time.sleep(60)
            try:
                return response
            except Exception as e:
                print(e)

        except Exception as e:
            issm_log.logger.error(f"Process failed {e}")


@app.route('/getResponse', methods=['GET'])
def get_upload():
    if request.method == 'GET':
        Total_Pages = session.get('Total_Pages')
        Total_Files = session.get('Total_Files')
        Total_Signatures = session.get('Total_Signatures')
        zipmsg = session.get('zipmsg')
        Split_Failure = session.get('Split_Failure')
        indexmsg = session.get('indexmsg')
        index_size = session.get('index_size')
        missing_records = session.get('missing_records')
        index_error = session.get('index_error')

        response_msg = {
            'Total_Pages': Total_Pages,
            'Total_Files': Total_Files,
            'Total_Signatures': Total_Signatures,
            'zipmsg': zipmsg,
            'Split_Failure': Split_Failure,
            'indexmsg': indexmsg,
            'index_size': index_size,
            'missing_records': missing_records,
            'index_error': index_error

        }
        issm_log.logger.info(f"Response message at end is {response_msg}")
        print(response_msg)

        return jsonify(response_msg)


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        issm_log.set_new_log_file()
        try:
            encoded_credentials = request.headers.get('Authorization').split(' ')[-1]
            decoded_credentials = base64.b64decode(encoded_credentials).decode().split(':')
            username = decoded_credentials[0]
            password = decoded_credentials[1]
            # name = request.form['usr']
            print(username)
            # pwd=request.form['pwd']
            session['name'] = decoded_credentials[0]
            result = checklogin(username, password)
            if isinstance(result, tuple):
                login_result, role = result
                print(result)
                if login_result == http.HTTPStatus.OK:
                    print("in logn ")
                    issm_log.logger.info(f"Login Successful for  {username}")
                    token_exp = datetime.datetime.utcnow() + timedelta(hours=1)  # Set token expiration time
                    token_payload = {'username': username, 'role': role, 'exp': token_exp}
                    token = jwt.encode(token_payload, 'secret', algorithm='HS256')  # Encode token with secret key
                    # response = make_response()
                    response = make_response({'message': 'Login successful', 'role': role})

                    response.headers['Role'] = role
                    response.headers['Authorization'] = f"Bearer {token}"  # Set JWT token in Authorization header

                    return response, http.HTTPStatus.OK

                    # print(session_key)
                    # print("qfgagfag")
                    # response=make_response()
                    # response.headers['Authorization'] = f"Bearer {session_key}"
                    # response.headers['Role']=role
                    # print(response)

                    return response, http.HTTPStatus.OK

            else:
                if result == http.HTTPStatus.UNAUTHORIZED:
                    issm_log.logger.info(f"Invalid username or password entered by {username}")
                    return 'Invalid username or password', http.HTTPStatus.UNAUTHORIZED


                else:
                    issm_log.logger.info("Server Error in login route")
                    return 'Internal server error', http.HTTPStatus.INTERNAL_SERVER_ERROR

        except Exception as e:
            issm_log.logger.error(f"Process failed {e}")


@app.route('/signup', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':

        issm_log.logger.info("Signup")

        username = request.form.get('usr')
        password = request.form.get('pwd')
        email = request.form.get('email')
        role = request.form.get('role')

        register_result = registeruser(username, password, email, role)

        if register_result == http.HTTPStatus.OK:
            issm_log.logger.info(f"Registered Use {username},{role},{email} ")
            return 'Register successful', http.HTTPStatus.OK
        elif register_result == http.HTTPStatus.UNAUTHORIZED:
            issm_log.logger.info(f"user is already resgistered with ")
            return 'username already registered, Please Login ', http.HTTPStatus.UNAUTHORIZED


@app.route('/forgot', methods=['POST', 'GET'])
def forgotpassword():
    if request.method == 'POST':
        issm_log.logger.log_filename = f'response_forgot_{timestamp}.log'
        issm_log.set_new_log_file()

        issm_log.logger.info(f"Forgot Password ")
        data = request.get_json()
        print(data)
        if data is None or 'usr' not in data:
            return jsonify({'error': 'Invalid data'}), 400
        else:
            user = data['usr']
            issm_log.logger.info(f"User {user} ")
            email, passw, username = forgotpassword1(user)
            print(email)
            sender, password = get_credentials('email')
            send_email(sender, password, email, username, passw)
            response_data = {'message': 'Password reset email sent'}
            issm_log.logger.info(f"Email Sent")
            return jsonify(response_data), 200


@app.route('/upload3', methods=['POST', 'GET'])
def Test():
    if request.method == 'POST':
        issm_log.logger.info(f"DSO Signature ")
        pdf_file = request.files['i20File']
        pdf_filename = pdf_file.filename
        pdf_file.save(pdf_filename)
        data = request.form
        sign = request.form.get('sign')
        split = request.form.get('split')
        dso = request.form.get('name')
        print(sign, split)

        if sign == 'on' and split == 'on':
            print(" in Both ON")
            issm_log.logger.info(f"Selected for Signature and Splitting")
            try:
                length, width, xco, yco = sign_details(dso)
                signature_file = signaturefile(dso)
                output_file = pdf_filename.split(".pdf")[0] + "_signed" + ".pdf"
                add_signature1(pdf_filename, signature_file, output_file, length, width, xco, yco)
                sevid = splitting(output_file)

                zip_filename = 'sign.zip'
                with ZipFile(zip_filename, 'w') as zip_file:
                    for filename in os.listdir('.'):
                        if filename.endswith('.pdf') and filename.startswith(
                                "N") and filename != pdf_filename or filename == "index_" + date + ".xlsx" and not filename == "index_" + date + ".txt":
                            zip_file.write(filename)

                response = make_response(send_file(zip_filename, as_attachment=True))
                response.headers['Content-Disposition'] = 'attachment; filename=signed_files.zip'

                for file_name in os.listdir('.'):
                    if file_name.endswith('.pdf') or file_name.endswith(
                            '.xlsx') and file_name != "user.xlsx" and not file_name.startswith(
                        'signature') and not file_name.endswith('.py'):
                        os.remove(file_name)
                session['signmsg'] = "Signing and Splitting Successful "
                return response
            except Exception as e:
                session['signmsg'] = f"Signing and Splitting failed with error {e}"
                issm_log.logger.error(f"Failed in sign=='on' and split== 'on',error{e}")


        elif (sign == 'on' and split == None):
            print("In sign ON")
            issm_log.logger.info("Selected sign ")
            length, width, xco, yco = sign_details(dso)
            signature_file = signaturefile(dso)
            output_file = pdf_filename.split(".pdf")[0] + "_signed" + ".pdf"
            try:

                add_signature1(pdf_filename, signature_file, output_file, length, width, xco, yco)

                zip_filename = 'sign.zip'
                with ZipFile(zip_filename, 'w') as zip_file:
                    for filename in os.listdir('.'):
                        if filename == output_file:
                            zip_file.write(filename)
                response = make_response(send_file(zip_filename, as_attachment=True))
                response.headers['Content-Disposition'] = 'attachment; filename=signed_files.zip'
                session['signmsg'] = "Signing done "
                return response
            except Exception as e:
                session['signmsg'] = f"Signing failed with error {e}"
                issm_log.logger.error(f"Error in sign=='on' and split==None,error {e}")
        else:
            print("ELSE")
            issm_log.logger.info("Splitting selected")
            try:
                sevid = splitting(pdf_filename)
                zip_filename = 'split.zip'
                with ZipFile(zip_filename, 'w') as zip_file:
                    for filename in os.listdir('.'):
                        if filename.endswith('.pdf') and filename.startswith(
                                "N") and filename != pdf_filename or filename == "index_" + date + ".xlsx" and not filename == "index_" + date + ".txt":
                            zip_file.write(filename)
                response = make_response(send_file(zip_filename, as_attachment=True))
                response.headers['Content-Disposition'] = 'attachment; filename=signed_files.zip'
                session['splitmsg'] = "Splitting done "
                return response
            except Exception as e:
                issm_log.logger.error(f"Error in Splitting , route /upload3 {e}")


@app.route('/getallusers', methods=['POST', 'GET'])
def alluser():
    if request.method == 'GET':
        allusers = users()
        users_list = allusers.tolist()
        return jsonify({'users': users_list})


@app.route('/getUser/<string:user>', methods=['POST', 'GET'])
@token_required
def userpop(user):
    if request.method == 'GET':
        print("In getuser")
        # data=request.get_json()
        # user=data
        userinf = userpopup(user)
        username, email, role = userinf

        return jsonify({'userinf': {'name': username, 'email': email, 'role': role}})


if __name__ == '__main__':
    app.run(debug=True)

