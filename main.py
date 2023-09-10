"""
Main Flask file
All the routes are defined in this file
/dso -GET: This returns all the DSO names
/dso -POST : This is for DSO Admin for adhoc works
/i20process -POST:Processes the i20's and returns index file and individual i20's
/i20process -GET: This is for displaying message at end of processing . Messages after each step are taken in and displayed from here
/login -POST: Route does handle user authentication
/forgot -POST: This is when user clicks on forgot password
/users -GET :returns all the users who are registred in this App
/users -POST: This is for new user signup/register
/users/<string:user> -GET: Returns all the  details of the selected user
/users/<string:user> -DELETE : Deletes the user
/users/<string:user> - PUT : User update in admin page
/changePwd/<string:user> -PUT : Changes password of the user
/addSign/<string:user> - POST : add signature page either TEST or Upload
"""
import secrets
from zipfile import ZipFile
from flask import Flask, render_template, request, send_file, make_response, jsonify, Response, session
from flask_socketio import SocketIO

import issm_log
from InitialIndex import indexFile, indexFile1
from addSignature import add_signature1
from dbstatements import insertprocessed
from deletefiles import remove_files
from dependentsplit import depi20
from dsodependedntsignature import depensignature
from dsodependentsignsplit import depi20signature
from fitzsplit import splitsignature, sign_details
from login import checklogin, registeruser, forgotpassword1, users, userpopup, change_password, deleteuser, \
    token_required, userupdate,updateuserdata
from name import names_list, signaturefile, signadd
from postToSlate import post, updateinstance, instanceget
import datetime
import base64
from datetime import timedelta
from sendemail import get_credentials, get_emails, send_email
from postToSlate import instanceinsert
from totalpages import pages
import http
import time
import jwt
import os
from flask_cors import CORS
import shutil


#import socketio


today = datetime.datetime.today()
date = today.strftime('%Y%m%d')
timestamp=datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
log_folder = os.path.join(os.getcwd(),'log')

cwd = os.getcwd()
app = Flask(__name__,template_folder='../../',static_folder='../../static')
CORS(app)
app.secret_key = secrets.token_bytes(32)
#socketio = SocketIO(app)
socketio = SocketIO(app,cors_allowed_origins="*")


#sio=socketio.Client()

@socketio.on('connect')
def handle_connect():
    print('Client connected')
@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
"""Default route"""
@app.route('/')
def home():
    return render_template('issm.html')


# @sio.on('connect')
# def handle_connect():
#     print('Client connected')
#
# @sio.on('register')
# def handle_register(data):
#     user = data.get('user')
#     session_id = request.sid
#     connected_clients[user] = session_id
#     print(f'Registered {user} with session ID {session_id}')
#



"""Displays all the names of DSO .
Gets all the names from names_list() function which is defined in name.py .
Returns all the names in json format to frontend """
@app.route('/dso', methods=['GET', 'POST'])
def names():
    if request.method == 'GET':
        fullnames = names_list()
        #dataframe is converted to list
        names = fullnames.tolist()
        #list is sent as json format
        return jsonify({'message':'DSO names fetched successfully', 'data':names})
    if request.method == 'POST':
            # Getting details form the form
            issm_log.logger.info(f"DSO Signature ")
            pdf_file = request.files['i20File']
            pdf_filename = pdf_file.filename
            pdf_file.save(pdf_filename)
            data = request.form
            sign = request.form.get('sign')
            split = request.form.get('split')
            dso = request.form.get('dso')
            username = session.get('name')
            #  print(sign,split)
            # if sign and split are selected then below condition is execcuted
            if sign == 'on' and split == 'on':
                # print(" in Both ON")
                issm_log.logger.info(f"Selected  Signature and Splitting")
                issm_log.logger.info(f"Received file {pdf_filename} , DSO  {dso}")
                try:
                    # getting coordinates of signature and signature file
                    length, width, xco, yco = sign_details(dso)
                    print("dimensions ")
                    signature_file = signaturefile(dso)
                    signature_file='../../signatures/'+signature_file
                    print("signature file done ")
                    output_file = pdf_filename.split(".pdf")[0] + "_signed" + ".pdf"
                    # signature is added in first page of each i20
                    result = depi20signature(pdf_filename, signature_file, length, width, xco, yco)

                    # add_signature1(pdf_filename, signature_file, output_file, length, width, xco, yco)
                    # splitting is done to the signature added file
                    # sevid ,pages= splitting(output_file)
                    # zipping the output file
                    zip_filename = 'sign.zip'
                    with ZipFile(zip_filename, 'w') as zip_file:
                        for filename in os.listdir('.'):
                            if filename.endswith('.pdf') and (filename.startswith(
                                    "N") or filename.startswith(
                                'F2-N')) and filename != pdf_filename or filename == "index_" + date + ".xlsx" and not filename == "index_" + date + ".txt":
                                zip_file.write(filename)
                    response = make_response(send_file(zip_filename, as_attachment=True))
                    response.headers['Content-Disposition'] = 'attachment; filename=signed_files.zip'
                    # deleting the files in server which are created
                    for file_name in os.listdir('.'):
                        if file_name.endswith('.pdf') or file_name.endswith(
                                '.xlsx') and file_name != "user.xlsx" and not file_name.startswith(
                            'signature') and not file_name.endswith('.py'):
                            os.remove(file_name)
                    session['signmsg'] = "Signing and Splitting Successful "
                    issm_log.logger.info("Signing and Splitting Successful ")
                    msg = f"Signing , Splitting is done and total i20's are {result} "
                    # print(msg)
                    response.status_code = 201
                    return response
                except Exception as e:
                    session['signmsg'] = f"Signing and Splitting failed with error {e}"
                    issm_log.logger.error(f"Failed in sign=='on' and split== 'on',error{e}")
            # If only signature is selected  then signature is added and zip file is sent as attachment
            elif (sign == 'on' and split == None):
                # print("In sign ON")
                # print(dso)
                issm_log.logger.info("Selected sign ")
                # getting coordinates of signature and signature file
                length, width, xco, yco = sign_details(dso)
                signature_file = signaturefile(dso)
                output_file = pdf_filename.split(".pdf")[0] + "_signed" + ".pdf"

                try:
                    issm_log.logger.info("Received for Sign ")
                    issm_log.logger.info(f"Received file {pdf_filename} , DSO  {dso}")
                    # signature is added
                    depensignature(pdf_filename, signature_file, output_file, length, width, xco, yco)
                    # add_signature1(pdf_filename, signature_file, output_file, length, width, xco, yco)
                    # print(output_file)
                    response = make_response(send_file(output_file, as_attachment=True))
                    session['signmsg'] = "Sign added "
                    msg = 'DSO Signature added '
                    return response
                except Exception as e:
                    session['signmsg'] = f"Signing failed with error {e}"
                    issm_log.logger.error(f"Error in sign=='on' and split==None,error {e}")
            # if only split is selected
            elif (sign == None and split == 'on'):
                # print("in split")
                # print("ELSE")
                issm_log.logger.info("Splitting selected")
                issm_log.logger.info(f"Received file {pdf_filename}")
                try:
                    # split the pdf .
                    sevid = depi20(pdf_filename)
                    # sevid = splitting(pdf_filename)
                    # zipping all the files
                    zip_filename = 'split.zip'
                    with ZipFile(zip_filename, 'w') as zip_file:
                        for filename in os.listdir('.'):
                            if filename.endswith('.pdf') and (filename.startswith(
                                    "N") or filename.startswith(
                                'F2-N')) and filename != pdf_filename or filename == "index_" + date + ".xlsx" and not filename == "index_" + date + ".txt":
                                zip_file.write(filename)
                    response = make_response(send_file(zip_filename, as_attachment=True))
                    response.headers['Content-Disposition'] = 'attachment; filename=signed_files.zip'
                    session['splitmsg'] = "Splitting done "
                    msg = "Splitting of file done"
                    response.status_code = 201

                    return response
                except Exception as e:
                    issm_log.logger.error(f"Error in Splitting , route /upload3 {e}")
            else:
                issm_log.logger.info("Nothing selected in DSO signature")
                return "Nothing selected in DSO Signature"

"""Process the i20 pdf file, issm excel file and slate excel file and 
retuns a zip format of all individual i20 files and index file
 Firstly we save the files in local  which are selected in front end. Then we will see the total number of pages in i20 file using function pages() which is definedin totalpages.py
  We are getting the coordinates of selected signature from excel file using the fucntion sign_details() defined in fitzsplit.py. Frmo the excel file it reads the coordinates of sleected user and returns
  Then using Signaturefile() function which is defined in name.py we are getting the name of singature file which is also in excel file
Then splitsignature() file is called which needs i20 file,signature file which is returned from Signaturefile(),coordinates of signature and
returns a list of all sevis id's,total pages in i20 file, total signatures added.
We calcualte total files by dividing totalpages/3 
Depending on the i20 type  we generate a index file using the function indexFile() or indexFile1() which are defined in initialindex.py .
indexFile() function takes in issm excel, slate excel and the list of sevis id's that splitsignature() gives and this returns 
size of index file and missing records which are missed in index file .
Then all these inidivial i20's and index file are zipped and made a response .
If the To Slate is slected as yes then the zip file is sent to slate using  post() function which is defined in postToSlate.py and it takes the zip file and whether it is UG or PG
At the end all these inidividal i20's , zip file and index files are deleted from directory .
In each step log is recorded   """
connected_clients = {}

@app.route('/i20process', methods=['POST', 'GET'])

def upload():
    if request.method == 'POST':
        try:
            #print("upload1")
            Total_Pages = None
            Total_Files = None
            Total_Signatures = None
            zipmsg = None
            Split_Failure=None
            index_size=None
            missing_records=None
            index_error=None
            print("here")
            #session_id = connected_clients.get(user)
            issm_log.logger.log_filename=f'response_{timestamp}.log'
            issm_log.set_new_log_file()
            #gettting the files from request, getting name and saving the file with that name
            pdf_file = request.files['i20File']
            issm_file = request.files['issmFile']
            slate_file = request.files['slateFile']
            # pdf_file=cwd+'Jun2923Signed.pdf'
            # issm_file='issmExcel (1).xlsx'
            # slate_file='Initial I20 Batch Indexing 20230629-092740.xlsx'
            # print("files okay")
            # pdf_filename='Jun2923Signed.pdf'
            # issm='issmExcel (1).xlsx'
            # slate='Initial I20 Batch Indexing 20230629-092740.xlsx'
            pdf_filename = pdf_file.filename
            issm = issm_file.filename
            slate = slate_file.filename
            issm_file.save(issm)
            slate_file.save(slate)
            pdf_file.save(pdf_filename)
            name = request.form['dsoName']
            print("dsoname okay ")
            slaterequest=request.form['toSlate']
            i20type=request.form['i20Type']
            print("okay till i20type")

            user=session.get('name')
            issm_log.logger.info(f"User logged in  :{user}")
            issm_log.logger.info(f"Intial I20. Received post request with files :{pdf_filename,issm,slate}")
            # Total number of pages in i20
            print("starting process")
            num_pages = pages(pdf_filename)

            print("in")
            sevid=""
            socketio.emit('rom', 1)

            try:
                #calling sign_details() function and taking all the coordinates
                length, width, xcoordinate, ycoordinate = sign_details(name)
                #Getting signature file name
                signature_file = signaturefile(name)
                # Splitting and signatures are added and all the sevis ids's are returned as list , total pages in i20 and toatal signatures added
                sevid,totalpages,totalsigns=splitsignature(pdf_filename, signature_file, length, width, xcoordinate, ycoordinate)
                socketio.emit('rom',2)
                #sevid, totalpagessplit = splitting(pdf_filename)
                totalpagessplit = totalpages / 3
                numberoffiles = totalpagessplit
                # Storing total pages, total files afte splitting , total signatures added to session
                session['Total_Pages']=f"{num_pages}"
                session['Total_Files']=f"{int(numberoffiles)}"
                session['Total_Signatures']=f"{totalsigns}"
                session['sevis_id']=f"{sevid}"
                issm_log.logger.info(f"Total Pages in i20: {num_pages}. Total Files after splitting: {int(numberoffiles)} Total signatures added are {totalsigns}")
            except Exception as e:
                session['Split_Failure']=f"Splitting of file is failed {e}"
                issm_log.logger.error(f"Splitting of file is failed {e}")
            try:
                # If i20 type is initial i20 then indexFile is called for creating a index file
               # print(sevid,issm,slate)
                if i20type=='initI20':
                    result=indexFile(sevid, issm)

                #if i20type is continued i20 then index file1 is called for creating index file
                elif(i20type=='contdI20'):
                    result=indexFile1(sevid, issm)
                    #print("Tyoe is result is ",type(result))
                # if index file returns a tuple then the values in tuple are assigned as size of indexfile , missing records
                if isinstance(result,tuple):

                    sizeOfIndexfile, missing,tablehtml=result
                    issm_log.logger.info(f"Index file created successfully and size is {sizeOfIndexfile}.Record not included in Index but is in ISSM/Slate {missing}")
                    session["index_size"] = f"{sizeOfIndexfile}"
                    socketio.emit('rom', 3)
                    session["missing_records"] = f"{missing}"
                    #print("Size of index file is ",sizeOfIndexfile)
                    if missing :
                        sender, password = get_credentials('email')
                        email,cc=get_emails('emails')
                       # print(email)
                       # print(cc)
                        email, cc = get_emails('emails')
                        #send_email1(sender, password, email, missing,pdf_filename,tablehtml,cc)
                # if index file doesnot return a tuple then it contains a message string which is assigned to msg
                else:
                   # print("Result",result)
                    msg=result
                    session["index_error"] = f"Index file creation failed {msg}"
                    issm_log.logger.error(f"Index file creation failed {msg}")
                #sizeOfIndexfile,missing=indexFile(sevid, issm, slate)
            except Exception as e:
                session["index_error"]=f"Index file creation failed {e}"
                issm_log.logger.error(f"Index file creation failed {e}")

            try:
                # writing to zip file . From the directory we are taking all the files that start with N and pdf files and adding to zip
                zip_filename = 'signed_files.zip'
                with ZipFile(zip_filename, 'w') as zip_file:
                    for filename in os.listdir('.'):
                        if filename.endswith('.pdf') and filename.startswith("N") and filename != pdf_filename and not filename.endswith("_unsigned.pdf") or filename == "index_" + date + ".xlsx" or filename == "index_" + date + ".txt":
                            zip_file.write(filename)
                response = make_response(send_file(zip_filename, as_attachment=True))
                response.headers['Content-Disposition'] = 'attachment; filename=signed_files.zip'
                response.headers['Content-Type'] = 'application/zip'
                issm_log.logger.info("Files Zipped")
                socketio.emit('rom', 4)
                session['zipmsg'] = "Success"
                #if slate request is yes then depending on program the post function is called
                if slaterequest=='y':
                    stream=request.form['program']
                    if stream=='g':
                        output=post(zip_filename, 'GR')
                        issm_log.logger.info(f"Response of files to slate {output}, stream is {stream}")
                        socketio.emit('rom', 5)
                        #print(output)
                    else:
                       # print("goign to UG")
                        output=post(zip_filename, 'UG')
                        issm_log.logger.info(f"Response of files to slate {output}, stream is {stream}")
                        socketio.emit('rom', 5)
                       # print(output)
            except Exception as e:
                session['zipmsg']=f"Files Zipping failed {e}"
                issm_log.logger.error(f"Files Zipping failed {e}")
            remove_files()
            time.sleep(60)
            try:
                return response
            except Exception as e:
                issm_log.logger.error(f"i20 response failed {e}")

            # print(e)
        except Exception as e:
            issm_log.logger.error(f"Process failed {e}")


    if request.method == 'GET':
            # from the session all the session messages are taken and returned as json
            TotalPages = session.get('Total_Pages')
            TotalFiles = session.get('Total_Files')
            TotalSignatures = session.get('Total_Signatures')
            zipMessage = session.get('zipmsg')
            splitFailure = session.get('Split_Failure')
            indexMessage = session.get('indexmsg')
            indexSize = session.get('index_size')
            missingRecords = session.get('missing_records')
            indexError = session.get('index_error')
            signMessage = session.get('signmsg')
            splitMessage = session.get('splitmsg')
            addSign = session.get('addSign')
            sevisids = session.get('sevis_id')
            # print("Sevisids in response/*/*/*",sevisids)
            user = session.get('name')
            # print("user in response",user)
            institution = session.get('institute')

            result = [s for s in [splitFailure, indexError, zipMessage] if s is not None and s != ""]
            # print("result is ",result)
            if result is not None:
                insertprocessed(user, sevisids, institution, str(result),processor='ISSM toSlate')
            else:
                result = 0
                # print("sevis is ",sevisids)
                # print("institution is ",institution)
                insertprocessed(user, sevisids, institution, str(result))
            response_msg = {
                'Total_Pages': TotalPages,
                'Total_Files': TotalFiles,
                'Total_Signatures': TotalSignatures,
                'zipmsg': zipMessage,
                'Split_Failure': splitFailure,
                'indexmsg': indexMessage,
                'index_size': indexSize,
                'missing_records': missingRecords,
                'index_error': indexError,
                'signmsg': signMessage,
                'splitmsg': splitMessage,
                'Add_sign': addSign
            }
            issm_log.logger.info(f"Response message at end is {response_msg}")
            # print(response_msg)
            session.pop('Total_Pages', None)
            session.pop('Total_Files', None)
            session.pop('Total_Signatures', None)
            session.pop('zipmsg', None)
            session.pop('Split_Failure', None)
            session.pop('indexmsg', None)
            session.pop('index_size', None)
            session.pop('missing_records', None)
            session.pop('index_error', None)
            session.pop('signmsg', None)
            session.pop('splitmsg', None)
            session.pop('addSign', None)
            return jsonify(response_msg)
"""This returns a message to front end after the /i20process route 
After each step in i2oprocess messages are added to session and those are retrived here and returned"""

"""Login Handles user authentication 
This takes username and password . Password is hashed and checked with the hashed value from excel
This retuns a token, HTTP response and message 
 """
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method=='POST':
        issm_log.set_new_log_file()
        try:
            # getting the username and password from the request header authorization
            encoded_credentials = request.headers.get('Authorization').split(' ')[-1]
            decoded_credentials = base64.b64decode(encoded_credentials).decode().split(':')
            username = decoded_credentials[0]
            password = decoded_credentials[1]
           # print(username)
            session['name']=decoded_credentials[0]
            result=checklogin(username,password)
            # the return of the function is tuple then its login successful and a token is assigned to a user and sent to front end .
            # HTTPS status codes are also returned
            if isinstance(result, tuple):
                login_result,role,institution_id,fullname,institutionname=result
               # print("Id is ",institution_id)
              #  print("/*/*/*/",result)
                if login_result == http.HTTPStatus.OK:
                 #   print("in logn ")
                    issm_log.logger.info(f"Login Successful for  {username}")
                    token_exp = datetime.datetime.utcnow() + timedelta(hours=1)  # Set token expiration time
                    token_payload = {'username': username, 'role': role, 'exp': token_exp}
                    token = jwt.encode(token_payload, 'secret', algorithm='HS256')
                 # Encode token with secret key
                 #   print("78",token)
                    response = make_response({'message': 'Login successful', 'data':{'role': role,'username':username,'fullname':fullname,'institutionname':institutionname}})
                    response.headers['Role']=role
                    response.headers['fullname'] = fullname
                    response.headers['username'] = username
                    response.headers['institutionid']=institution_id
                    response.headers['Authorization'] = f"Bearer {token}"  # Set JWT token in Authorization header
                   # print("4124145",response)
                    session['institute']=(institution_id)
                    return response, http.HTTPStatus.OK
            else:
                if result == http.HTTPStatus.UNAUTHORIZED:
                    issm_log.logger.info(f"Invalid username or password entered by {username}")

                    response=make_response({'message': 'Incorrect username or password'},http.HTTPStatus.UNAUTHORIZED)
                    return response
                else:
                    issm_log.logger.info("Server Error in login route")
                    response = make_response({'message': 'Server Error'},
                                             http.HTTPStatus.UNAUTHORIZED)
                    return response

        except Exception as e:
              issm_log.logger.error(f"Process failed {e}")

"""This route is for registering a new user.
function registeruser() is called which is defined in login.py It takes in username, password,email and Role . these are saved in excel  
At the end it returns the result message and HTTP response 
"""
@app.route('/users', methods=['POST','GET'])

def register():
    if request.method == 'POST':
        issm_log.logger.info("Signup")
        username= request.form.get('username')
        email=request.form.get('email')
        fullname=request.form.get('fullname')
        role=request.form.get('role')
        institutionid = request.headers.get('institutionid')
        #institutionid=session['institutionid']
        # registering the user with the definition registeruser
        register_result=registeruser(username,email,role,fullname,institutionid)
        # if register is successful then return the messages
        if register_result == http.HTTPStatus.OK:
            issm_log.logger.info(f"Registered Use {username},{role},{email} ")
            return jsonify({'message':'Registration successful'}, http.HTTPStatus.OK)
        elif register_result == http.HTTPStatus.UNAUTHORIZED:
            issm_log.logger.info(f"user is already resgistered with ")
            return jsonify({'message':'username already registered, Please Login '}, http.HTTPStatus.UNAUTHORIZED)
        else:
            return jsonify({'message':register_result}, http.HTTPStatus.UNAUTHORIZED)
        """ This route retunes all the users who are registred in app 
        sending the response in json format
        Function used is users()"""

    if request.method == 'GET':
            # fucntion returns all users in ascending order of fullnames
            institutionid = request.headers.get('institutionid')
            allusers = users(institutionid)
            print(type(allusers))

            return jsonify({'message': 'user details fetched', 'data': allusers.to_dict('records')})
"""This is for Forgot password.
If the username which user entered is in excel we send en email with password to their registred email
and returns a message as successful if mail is sent. If username is not in excel then message will be invalid data"""
@app.route('/forgot', methods=['PUT', 'GET'])
def forgotpassword():
    if request.method == 'PUT':
        issm_log.logger.log_filename = f'response_forgot_{timestamp}.log'
        issm_log.set_new_log_file()

        issm_log.logger.info(f"Forgot Password ")
        username=request.form.get('username')
       # print(data)
        #checking if username is in request
        if username :
            issm_log.logger.info(f"User {username} ")
            # a random password is generated and emailed to user
            res = forgotpassword1(username)
            if isinstance(res, tuple):
                email, passw, user = res
                socketio.emit('rom',{'message':'changed password '})
                # print(email)
                sender, password = get_credentials('email')
                # send email
                send_email(sender, password, email, user, passw)
                response_data = {'message': 'Password reset email sent'}
                issm_log.logger.info(f"Email Sent")
                return jsonify(response_data), 200
            else:
                response_data = {'message': 'Username not Registered'}
                return response_data, http.HTTPStatus.UNAUTHORIZED


        else:
            return jsonify({'message': 'Invalid data'}), 400


""" This routye is for DSO admin for the Adhoc works . 
user needs to upload a file and select either Split, signature or both .
If Split is selected then a zip file is returned with the all the files split into individual I20's
 If Signature is selected then signature of selected DSO is added to each i20 and PDF is returned in zip file
 If Both Split and Signature are selected then signature is added to each i20 and then splitted which is eventually returned in Zip file
 Functions used are sign_details() to get the coordinates of signature.
 signaturefile() to get the file name of signature 
 add_signature1() which adds signature to each i20
 splitting() which splits the files into individual i20's 
 """



""" This route returns the details of selected user using the function userpopup() .
 Sending in json format """
@app.route('/users/<string:user>', methods=[ 'GET','DELETE','PUT'])
def userpop(user):
    if request.method=='GET':
        #print("In getuser")
        #print(user)
        #institutionid=session['institutionid']

        institutionid = request.headers.get('institutionid')
        #print(institutionid)
        if institutionid is not None:
            #data=request.get_json()
            # user=data
            # userinformatiomn is populated , all details of user are taken
            userinf=userpopup(user,institutionid)
            issm_log.logger.info(f"Clicked on user info for user- {user}")
            username,email,role,fullname,active=userinf
            print('userinf is ',userinf)
            #returning json with all details
            issm_log.logger.info(f"Users for particular user fetched {user}")
            return jsonify({'message':'User details fetched','data':{'username':username,'email':email,'role':role,'fullname':fullname,'active':bool(active)}})
        else :
            issm_log.logger.info(f"Users for particular user  not fetched {user}. Institution id is missing ")
            return jsonify({'message':'institution id is missing '})
    """Deleting user """
    if request.method == 'DELETE':
        # delete user function will delte user and remove form the excel
        msg = f'Delete user {user}'
        g = deleteuser(user)
        issm_log.logger.info(f"Deleted user {user}")
        # message is returned
        return jsonify({'message': 'Deleted user', 'output': g})

    if request.method == 'PUT':
            # Getting details from the form
            fullname = request.form.get('fullname')
            email = request.form.get('email')
            role = request.form.get('role')
            status=request.form.get('active')
            issm_log.logger.info(f"Update for user with {user}, Fullname :{fullname}. email:{email} and role :{role}")
            # updating based on the details given it the function userupdate
            result = userupdate(user, fullname, email, role,status)
            if 'successfully'in result:
                fullname,email,role,upstatus=updateuserdata(user)
                if status!=upstatus:
                    issm_log.logger.info(result)
                    return jsonify({'message': 'User Reactivated !!!', 'data': {'fullname':fullname,'email':email,'role':role,'status':bool(upstatus)}})
                else:
                    issm_log.logger.info(result)
                    return jsonify({'message': 'User updated','data': {'fullname': fullname, 'email': email, 'role': role,'status':bool(status)}})
            else:
                return jsonify(({'message':'user couldnt be updated'}))


"""Change Password in Profile dropdown"""
@app.route('/changePwd/<string:user>',methods=['PUT','POST'])

def changepwd(user):
    if request.method=='PUT':
        #getting all details from the form
        pwd=request.form.get('nPwd')
        print("passwored is ",pwd)
        cPwd=request.form.get('cPwd')
        #institutionid=session['institutionid']
        institutionid = request.headers.get('institutionid')
        username=user
        #print("Password is ",pwd)
        #print(username)
        issm_log.logger.info(f"Received change password for user -{user}")
        #check if password and confirm password are same
        if pwd!=cPwd:
            #changepassword function will change password and update in excel
            g=change_password(username,pwd,cPwd,institutionid)
            #print("g is ",g)
            # check if the result of fucntion is tuple
            if isinstance(g,tuple):
                email,pwd,username=g
                # get email creds
                sender, password = get_credentials('email')
                # send email to as password is changed
                #send_email(sender, password, email, username, pwd)
                issm_log.logger.info(f"Changed password for user -{user}")
                return jsonify({'message':'Password Changed for user'})
            else:
                # if result is not tuple then it has some error and that error message is returned
                msg=g
                return jsonify({'message':msg})
        else:
            issm_log.logger.info(f"Password and Current passwod are incorrect")
            return "Password and Current passwod are incorrect  "

"""Adding new signature"""
@app.route('/addSign/<string:user>',methods=['POST'])

#
def addsign(user):
   # print(user)
    if request.method=='POST':
        #getting details from the form
       # print('username is ',username)
        fullname=request.form.get('fullname')
        email=request.form.get('email')
        png_file = request.files['signFile']
        png_filename = png_file.filename
        png_file.save(user+'.png')
        sign=request.form['action']
        length=int(request.form.get('length'))
        width=int(request.form.get('width'))
        xco=int(request.form.get('x'))
        yco=int(request.form.get('y'))
        output_file='i20.pdf'
        institutionid=request.headers.get('institutionid')
        # sample i20 which is saved
        pdf_filename=cwd+r'\Test_sign\i20.pdf'
        # if sign type is test  then we just send the pdf file file with the signature and not put those details in DB
        if sign=='test':
            """Test signature but dont add"""
            add_signature1(pdf_filename, user+'.png', output_file, int(length), int(width),int(xco),int(yco))
            response=make_response(send_file(output_file, as_attachment=True))
            session['addSign']='Signature added to I-20.'
            return response
        # if sign type is upload then it will write to excel and download a pdf
        elif sign =='upload':
            """Add signature to excel file """
            add_signature1(pdf_filename, user+'.png', output_file, int(length), int(width),int(xco),int(yco))
            shutil.move(user+'.png','../../signatures/'+user+'.png')
            response = make_response(send_file(output_file, as_attachment=True))
            msg=signadd(user,length,width,xco,yco,institutionid)
            session['addSign']='Signature added to I-20.Updated in Database'

            return response


@app.route('/instance',methods=['POST','PUT','GET'])
def isntance():
    if request.method=='POST':
        url=request.form.get('jsonendpoint')
        type=request.form.get('jsontype')
        username=request.form.get('username')
        password=request.form.get('password')
        institutionid=request.headers.get('institutionid')
        print(url,type,username,password,institutionid)
        msg=instanceinsert(url,type,username,password,institutionid)
        print(msg)
        if msg=='Instance inserted successfully':
            return jsonify({'message':'Instance inserted successfully'})
        else :
            return jsonify({'message':'Instance insertion failed'})


    if request.method=='PUT':
        type=request.form.get('jsontype')
        username = request.form.get('username')
        password = request.form.get('password')
        institutionid = request.headers.get('institutionid')
        updateinstance(password,username,institutionid)

    if request.method=='GET':
        institutionid=request.headers.get('institutionid')
        result = instanceget(institutionid)
        result_dict = result.to_dict(orient='records')
        return jsonify({'message': 'Fetched instances', 'data': result_dict})

@app.route('/log',methods=['GET'])
def processed():
    if request.method=='GET':
        result= issm_log.processedgetter()
        result_dict = result.to_dict(orient='records')

        return jsonify({'message':'logged fetched','data':result_dict})




if __name__ == '__main__':
    #app.run(debug=True,port=8081)
    socketio.run(app, debug=True,port=8081)
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(asyncio.ensure_future(app.run()))