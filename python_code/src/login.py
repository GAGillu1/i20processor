import bcrypt
import pandas as pd
import http
import random
import string
import jwt
from functools import wraps
from flask import request, current_app, jsonify
from flask import jsonify

import dba
import issm_log
from dbstatements import selectusers, insertusers, updatepass, updateuser, deleteusers, updatelogin, activeusers, \
    loginusers, userdata, insertpc
import random
import string
from sendemail import get_credentials, send_email, send_email2

# Generate a random integer between 1 and 100
random_number1 = random.randint(1, 100)
random_number2=random.randint(1, 100)

# Generate a random special character
special_char = random.choice(string.punctuation)



def generate_random_string(length=12):
    characters = string.ascii_letters + string.digits  # includes both letters and numbers
    random_string = ''.join(random.choice(characters) for i in range(length))
    return random_string

# Generate a 9-character random string

"""Below function is for registering user and parameters required are username, password, enail, role and fullname"""
def registeruser(username,email,role,fullname,institutionid,contact):
    df = selectusers(institutionid)
    #generating random salt to hash the password
    salt=bcrypt.gensalt()
    password=generate_random_string()
    stringsalt=salt.decode('utf-8')
    #hashing the password with the generated salt
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
    pwd=password_hash.decode('utf-8')
    #users=df['username'].astype(str).values.tolower()
    if df is not None :
        usernames = (df['userName'].str.lower().values)
        emails = (df['email'].str.lower().values)
        username = username.lower()
        email = email.lower()

        # if username and email is already in database
        if ((usernames == username) & (emails == email)).any():
            msg="Username and email combination already registered."
            return msg
        #if username is already in DB , returning the email
        elif (usernames == username).any():
            useremail=emails[usernames == username]
            msg=f"Username already registered and email {', '.join(useremail)}"
            return msg
        #if email is in DB then returning the username
        elif (emails == email).any():
            userna = usernames[emails == email]
            msg=f"Email already registered with a different username: {', '.join(userna)}"
            return msg
        # if email and username did not match in database then we are adding details to DB which is excel
        elif ((emails != email) & (usernames != username)).any():
            #data=pd.DataFrame({'username':[username],'fullname':[fullname],'salt':[stringsalt],'hash':[pwd],'Email':[email],'Role':[role]})
            # with pd.ExcelWriter('user.xlsx', mode='a', engine='openpyxl', if_sheet_exists='overlay') as writer:
            #     data.to_excel(writer, sheet_name="Sheet1",header=None, startrow=writer.sheets["Sheet1"].max_row,index=False)
            #     return http.HTTPStatus.OK

            data=insertusers(fullname,username,email,role,institutionid,salt,pwd)
            sender, emailpassword = get_credentials('email')
            # send email to as password is changed
            send_email2(sender, emailpassword, email,fullname, username, password)
            return http.HTTPStatus.OK
        #any errors then unauthorized
        else:
            return http.HTTPStatus.UNAUTHORIZED

    # if user_df.empty:
    #
    #     data=pd.DataFrame({'username':[username],'salt':[stringsalt],'hash':[pwd],'Email':[email],'Role':[role]})
    #     with pd.ExcelWriter('user.xlsx', mode='a', engine='openpyxl',if_sheet_exists='overlay') as writer:
    #
    #         data.to_excel(writer, sheet_name="Sheet1",header=None, startrow=writer.sheets["Sheet1"].max_row,index=False)
    #         return http.HTTPStatus.OK
    #
    # else:
    #     return http.HTTPStatus.UNAUTHORIZED
# k=registeruser("Gov","Qwerty","gillu1@unh.newhaven.edu","ADMIN",'D4BEFFDF-882F-4D26-B2A1-2A8F9ED85EB4')
# print(k)
#registeruser('tester','abcde','abcde@email.com','ADMIN','I am tester')
def confignewuser(username,password,email,role,fullname,university):
    salt = bcrypt.gensalt()
    stringsalt = salt.decode('utf-8')
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
    pwd = password_hash.decode('utf-8')
    data = insertusers(fullname, username, email, role, university, salt, pwd)
    return http.HTTPStatus.OK
#confignewuser('Gov','Qwerty','illurugovardhanreddy@gmail.com','ADMIN','Govardhan','D4BEFFDF-882F-4D26-B2A1-2A8F9ED85EB4')

"""This is for login verification we hash the entered password and check if hashed password in DB is equal to this hashed password"""
def checklogin(email, password):
    try:
        #reading excel file
        #df = pd.read_excel('user.xlsx')
        df=loginusers()
        # filtering the dataframe with the username so we get filtered dataframe
        user_df = df.loc[df['email'] == email]
        #if the dataframe is not empty means we have userdata in dataframe which is below condition
        if not user_df.empty:
            salt = user_df['salt'].values[0]
            if salt:
                #checking the hashed password with the the value in DB
                password_hash = bcrypt.hashpw(password.encode('utf-8'), salt.encode('utf-8'))
                stored_hash = user_df['hash'].values[0].encode('utf-8')
                if password_hash == stored_hash:
                    roles=user_df['userRole'].values[0]
                    institutionId=user_df['institutionid'].values[0]
                    fullname=user_df['fullname'].values[0]
                    username=user_df['userName'].values[0]

                    institutionname=user_df['institutionName'].values[0]
                    updatelogin(email)
                    return http.HTTPStatus.OK,roles,institutionId,fullname,institutionname,username  # return 200 if login successful
        return http.HTTPStatus.UNAUTHORIZED  # return 401 if login unsuccessful


    except pd.errors.EmptyDataError:
        return http.HTTPStatus.INTERNAL_SERVER_ERROR  # return 500 if Excel file is empty
    except Exception as e:
        return http.HTTPStatus.INTERNAL_SERVER_ERROR  # return 500 for all other errors
# k=checklogin('illurugovardhanreddy@gmail.com','Gov6635')
# print('output form k is ',k)
#checklogin('illurugovardhanreddy@gmail.com','Qwerty')
"""Definition for forgotpassword . Where We are sending the password in email """
def forgotpassword1(email):
    #df = pd.read_excel('user.xlsx')
    df=activeusers()
    #lowercase_usernames = df['username'].astype(str).lower()

    #print(type(lowercase_usernames))
    #if username entered is in DB
    # email=""
    if email in df['email'].astype(str).values:
        #a random password with username and two random numbers and a specialcharacter
        matched_row = df.loc[df['email'] == email]
        username = matched_row['userName'].iloc[0]
        pwd=f"{username}{random_number1}{random_number2}"
        #pwd="Qwerty"
        salt = bcrypt.gensalt()
        stringsalt = salt.decode('utf-8')
        password_hash = bcrypt.hashpw(pwd.encode('utf-8'), salt)
        password = password_hash.decode('utf-8')
        df.loc[df['email'] == email, 'hash'] = password
        df.loc[df['email'] == email, 'salt'] = stringsalt

        fullname=df.loc[df['email'] == email,'fullname'].iloc[0]
        #updating the password and writing to excel
        updatepass(email,stringsalt,password_hash)
        #df.to_excel('user.xlsx', index=False)
        return [email],pwd,fullname
    else:
        return "Username not registered"
#forgotpassword1('illurugovardhanreddy@gmail.com')
#g=forgotpassword1('Gov')

"""Definition is to retrive all users form DB which is excel here """
def users(instituteid):
    try:
        dba.connect()
        df=selectusers(instituteid)
        allUsers=df[['fullname','userName','userRole','email','active']]
        # retiving all users and changing  sorting based on fullnames
        allUsers = allUsers.rename(columns={'userRole': 'role','userName':'username'})
        allUsers=allUsers.sort_values(by=['fullname'])
        #usernames=df['username']
        return allUsers.reset_index(drop=True) if not allUsers.empty else None
    except Exception as e:
        return None
#email,passw,username=forgotpassword1('GOV')
# print(email)
# sender, password =get_credentials('email')
# send_email(sender, password, email,username,passw)
# k=users('386FDB0A-EAD4-4916-829E-3196F4AC30F5')
# print(k)

# g=login('GOV','ABCD')
# print(g)
"""Delete user from Excel """
def deleteuser(user):
    #df=pd.read_excel('user.xlsx')
    df=activeusers()
    usernames = (df['userName'].str.lower().values)
#check the username and if it matches
    if (usernames==user.lower()).any():

        #userindex=df[df['username']==user].index
        #Index of the value where the user is matched
        #dropping the index which means deleting the record from dataframe
        f=deleteusers(user)
        # df.drop(userindex,inplace=True)
        # df.to_excel('user.xlsx',index=False)
        msg="user deleted succfully"
        issm_log.logger.info(f"User delete successfully {user}")
        return msg
    elif(usernames!=user.lower()).any():
        msg=" User not in system "
        return msg
#deleteuser('Ga')
#deleteuser('abc')
"""Below definition is to get details of the user and return them """
def userpopup(email,institutionid):
    df=selectusers(institutionid)
    emails = (df['email'].str.lower().values)
    # getting dataframe where the username is matches with the one in excel
    userdf=df[emails==email.lower()]
    #print(userdf)
    #print(userdf.iloc[0]['Email'])
    # getting email,role, name and fullname from excel
    #email=userdf.iloc[0]['email']
    role=userdf.iloc[0]['userRole']
    name=userdf.iloc[0]['userName']
    fullname=userdf.iloc[0]['fullname']
    active=userdf.iloc[0]['active']

    return name,email,role,fullname,active

"""Below is a wrap function  to check if user has token in the request or not """
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
#In authorization header we will split and decode it with and check if it is same as what was sent from system
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split()[1]

# if token is not in header then  return msg as token is missing
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
# if token in then decode if it is same as what was sent
        try:
            data = jwt.decode(token, 'secret', algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(*args, **kwargs)

    return decorated

"""Definition is to change password for user input paramanetrs are username and new password """
def change_password(email,password,current_password,institutionid):
    #df=pd.read_excel('user.xlsx')
    df=selectusers(institutionid)
    try:
        emails = (df['email'].str.lower().values)
        #if username is equal to then we are changing the value of hash and salt in excel .
        if (emails == email.lower()).any():
            user_df=df.loc[df['email']==email]
            salt=user_df['salt'].values[0]
            password_hash = bcrypt.hashpw(password.encode('utf-8'), salt.encode('utf-8'))
            stored_hash = user_df['hash'].values[0].encode('utf-8')

            if password_hash !=stored_hash:
                #pwd=f"{username}{random_number1}{random_number2}{special_char}"
                pwd=password
                salt = bcrypt.gensalt()
                stringsalt = salt.decode('utf-8')
                password_hash = bcrypt.hashpw(pwd.encode('utf-8'), salt)
                password = password_hash.decode('utf-8')
                # df.loc[df['username'] == username, 'hash'] = password
                # df.loc[df['username'] == username, 'salt'] = stringsalt
                fullname=df.loc[df['email'] == email,'fullname'].iloc[0]

                #df.to_excel('user.xlsx', index=False)
                updatepass(email,stringsalt,password_hash)

                return [email],pwd,fullname


            else:
                return("Current password doesnt match ")
        else:
            msg=("Not in excel ")
            return msg
    except Exception as e:
        return e
"""This is update user in excel given user,fullname,email,role """
def userupdate(user,fullname,email,role,status,username):
   try:

        updateuser(user,fullname,email,role,status,username)
        return "user updated successfully"
   except Exception as e:

       return e


def updateuserdata(user):
    data = userdata(user)
    if data is not None :
        fullname=data['fullname'].values[0]
        userRole=data['userRole'].values[0]
        status=data['active'].values[0]
        username=data['userName'].values[0]
        return fullname,userRole,status,username
