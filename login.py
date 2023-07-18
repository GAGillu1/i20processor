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
from dbstatements import selectusers, insertusers, updatepass, updateuser, deleteusers
from sendemail import get_credentials, send_email

# Generate a random integer between 1 and 100
random_number1 = random.randint(1, 100)
random_number2=random.randint(1, 100)

# Generate a random special character
special_char = random.choice(string.punctuation)



"""Below function is for registering user and parameters required are username, password, enail, role and fullname"""
def registeruser(username,password,email,role,fullname):
    df = selectusers()
    #generating random salt to hash the password
    salt=bcrypt.gensalt()
    stringsalt=salt.decode('utf-8')
    #hashing the password with the generated salt
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
    pwd=password_hash.decode('utf-8')
    #users=df['username'].astype(str).values.tolower()
    usernames = (df['userName'].str.lower().values)
    emails = (df['email'].str.lower().values)
    username = username.lower()
    email = email.lower()
    # if username and email is already in database
    if ((usernames == username) & (emails == email)).any():
        print("Username and email combination already registered.")
        msg="Username and email combination already registered."
        return msg
    #if username is already in DB , returning the email
    elif (usernames == username).any():
        useremail=emails[usernames == username]
        print(f"Username already registered and email {', '.join(useremail)}")
        msg=f"Username already registered and email {', '.join(useremail)}"
        return msg
    #if email is in DB then returning the username
    elif (emails == email).any():
        userna = usernames[emails == email]
        print(f"Email already registered with a different username: {', '.join(userna)}")
        msg=f"Email already registered with a different username: {', '.join(userna)}"
        return msg
    # if email and username did not match in database then we are adding details to DB which is excel
    elif ((emails != email) & (usernames != username)).any():
        print("Username and email combination not registered yet.")
        #data=pd.DataFrame({'username':[username],'fullname':[fullname],'salt':[stringsalt],'hash':[pwd],'Email':[email],'Role':[role]})
        # with pd.ExcelWriter('user.xlsx', mode='a', engine='openpyxl', if_sheet_exists='overlay') as writer:
        #     data.to_excel(writer, sheet_name="Sheet1",header=None, startrow=writer.sheets["Sheet1"].max_row,index=False)
        #     return http.HTTPStatus.OK
        data=insertusers(fullname,username,email,role,'University of New Haven',salt,pwd)
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
#registeruser("GaV","Password","gillu1@unh..edu","GA")

"""This is for login verification we hash the entered password and check if hashed password in DB is equal to this hashed password"""
def checklogin(username, password):
    try:
        #reading excel file
        #df = pd.read_excel('user.xlsx')
        df=selectusers()
        print(username)
        # filtering the dataframe with the username so we get filtered dataframe
        user_df = df.loc[df['userName'] == username]
        print(user_df)
        #if the dataframe is not empty means we have userdata in dataframe which is below condition
        if not user_df.empty:
            salt = user_df['salt'].values[0]
            print("salt is ",salt)
            if salt:
                #checking the hashed password with the the value in DB
                password_hash = bcrypt.hashpw(password.encode('utf-8'), salt.encode('utf-8'))
                stored_hash = user_df['hash'].values[0].encode('utf-8')
                print(stored_hash)
                print(password_hash)
                if password_hash == stored_hash:
                    roles=user_df['userRole'].values[0]
                    institution=user_df['institutionId'].values[0]
                    print(institution)
                    print(roles)
                    return http.HTTPStatus.OK,roles,institution  # return 200 if login successful
        return http.HTTPStatus.UNAUTHORIZED  # return 401 if login unsuccessful


    except pd.errors.EmptyDataError:
        print("Error")
        return http.HTTPStatus.INTERNAL_SERVER_ERROR  # return 500 if Excel file is empty
    except Exception as e:
        print(e)
        return http.HTTPStatus.INTERNAL_SERVER_ERROR  # return 500 for all other errors

"""Definition for forgotpassword . Where We are sending the password in email """
def forgotpassword1(username):
    #df = pd.read_excel('user.xlsx')
    df=selectusers()
    #lowercase_usernames = df['username'].astype(str).lower()

    #print(type(lowercase_usernames))
    #if username entered is in DB
    email=""
    if username in df['userName'].astype(str).values:
        #a random password with username and two random numbers and a specialcharacter
        pwd=f"{username}{random_number1}{random_number2}{special_char}"
        #pwd="Qwerty"
        salt = bcrypt.gensalt()
        stringsalt = salt.decode('utf-8')
        password_hash = bcrypt.hashpw(pwd.encode('utf-8'), salt)
        password = password_hash.decode('utf-8')
        df.loc[df['userName'] == username, 'hash'] = password
        df.loc[df['userName'] == username, 'salt'] = stringsalt

        email = df.loc[df['userName'] == username,'email'].iloc[0]
        fullname=df.loc[df['userName'] == username,'fullname'].iloc[0]
        #updating the password and writing to excel
        print(email,fullname,pwd)
        updatepass(username,stringsalt,password_hash)
        #df.to_excel('user.xlsx', index=False)

        return [email],pwd,fullname
    else:
        print("Not in excel ")

        return "Username not registered"

#g=forgotpassword1('Gov')
"""Definition is to retrive all users form DB which is excel here """
def users():
    try:
        dba.connect()
        df=selectusers()
        allUsers=df[['fullname','userName','userRole']]

        # retiving all users and changing  sorting based on fullnames
        allUsers = allUsers.rename(columns={'userRole': 'role','userName':'username'})
        allUsers=allUsers.sort_values(by=['fullname'])

        #usernames=df['username']

        return allUsers.reset_index(drop=True) if not allUsers.empty else None

    except Exception as e:
        print(f"Error reading user data: {e}")
        return None
#email,passw,username=forgotpassword1('GOV')
# print(email)
# sender, password =get_credentials('email')
# send_email(sender, password, email,username,passw)


# g=login('GOV','ABCD')
# print(g)
"""Delete user from Excel """
def deleteuser(user):
    #df=pd.read_excel('user.xlsx')
    df=selectusers()
    usernames = (df['userName'].str.lower().values)
    print("user is ",user)
    print("usernames is ",usernames)
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
        print(msg)
        return msg
#deleteuser('Ga')
#deleteuser('abc')
"""Below definition is to get details of the user and return them """
def userpopup(user):
    df=selectusers()
    usernames = (df['userName'].str.lower().values)
    # getting dataframe where the username is matches with the one in excel
    userdf=df[usernames==user.lower()]
    print(userdf)
    #print(userdf)
    #print(userdf.iloc[0]['Email'])
    # getting email,role, name and fullname from excel
    email=userdf.iloc[0]['email']
    role=userdf.iloc[0]['userRole']
    name=userdf.iloc[0]['userName']
    fullname=userdf.iloc[0]['fullname']

    return name,email,role,fullname
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
def change_password(username,password):
    #df=pd.read_excel('user.xlsx')
    df=selectusers()
    try:
        usernames = (df['userName'].str.lower().values)
        print(type(usernames))
        #if username is equal to then we are changing the value of hash and salt in excel .
        if (usernames == username.lower()).any():
            #pwd=f"{username}{random_number1}{random_number2}{special_char}"
            pwd=password
            salt = bcrypt.gensalt()
            stringsalt = salt.decode('utf-8')
            password_hash = bcrypt.hashpw(pwd.encode('utf-8'), salt)
            password = password_hash.decode('utf-8')
            # df.loc[df['username'] == username, 'hash'] = password
            # df.loc[df['username'] == username, 'salt'] = stringsalt
            #
            email = df.loc[df['userName'] == username,'email'].iloc[0]
            fullname=df.loc[df['userName'] == username,'fullname'].iloc[0]

            #df.to_excel('user.xlsx', index=False)
            updatepass(username,stringsalt,password_hash)
            return [email],pwd,fullname
        else:
            msg=("Not in excel ")
            return msg
    except Exception as e:
        print(e)
        return e
"""This is update user in excel given user,fullname,email,role """
def userupdate(user,fullname,email,role):
   try:
       #replace the fullname, email and role with the new ones provided
        #df=pd.read_excel('user.xlsx')

        # usernames= (df['userName'].str.lower().values)
        # df.loc[df['userName'] == user, 'fullname'] = fullname
        # df.loc[df['userName'] == user, 'email'] = email
        # df.loc[df['userName'] == user, 'userRole'] = role
        #df.to_excel('user.xlsx',index=False)
        updateuser(user,fullname,email,role)
        return "user updated successfully"
   except Exception as e:

       return e




#g=change_password('GOV','Abcdefg')





# g=userpopup('shirdi')
# print(g)

#
# g=users()
# print(type(g))
# print(g)