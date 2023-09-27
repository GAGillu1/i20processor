import requests
from cryptography.fernet import Fernet
from dbstatements import selectinstance, insertinstance, updateinstancedb, getinstances, getinstaceinfo
from encryption_decryption import encryptsalt, decryptsalt

"""Decrypting the password with the key """
def decrypt(instancetype,universityname):
    result=selectinstance(instancetype, universityname)
    print("result is ",result)
    instanceUrl=result['jsonendpoint'][0]
    username=result['username'][0]
    password=result['instancePassword'][0]
    encpwd=result['instancePassword'][0]
    # key=result['instanceKey'][0]
    # fernet=Fernet(key)
    password=decryptsalt(encpwd)
    print(instanceUrl,username, password)
    return instanceUrl,username,password

"""Posting the files to slate"""
def post(file, instance):
    client_url,username,pw = decrypt(instance, 'University Of New Haven')

    print(client_url,username,pw)
    password = pw
    # Define the file to upload
    file_path = file
    session = requests.Session()
    # Open the file and read its contents as bytes
    with open(file_path, "rb") as file:
        file_contents = file.read()
    # Create a requests session and add the username and password to the session
    session = requests.Session()
    session.auth = (username, password)
    # Make a POST request to the client URL with the JSON payload and authentication
    response = session.post(client_url, data=file_contents)
    # Print the response from the client
    return (response.text)
def connectiontest(instance,institutionid):
    client_url, username, pw = decrypt(instance, institutionid)

    session = requests.Session()
    session.auth = (username, pw)

    # Make a GET request to test the connection
    response = session.get(client_url)

    # If the response status code is 200, the connection is successful.
    if response.status_code == 200:
        return True, "Connection Successful"
    else:
        return False, f"Connection Failed with status code {response.status_code}"

# p=connectiontest('GR','386FDB0A-EAD4-4916-829E-3196F4AC30F5')
# print(p)
#insertinstance('tesu', 'grad', 'tester', 'testerpwd' ,'A0494CF8-A800-47B7-93DB-0974B04A4568')
def instanceinsert(url,type,username,password,universityid):
    try:
        print("inin i")
        password=password.encode('utf-8')
        encrypetedpwd=encryptsalt(password)
        print(encrypetedpwd)
        print(url,type,username,universityid)
        k=insertinstance(url,type,username,encrypetedpwd,universityid)
        print(k)
        return 'Instance inserted successfully'
    except Exception as e:
        return f"Error in inserting instance {e}"


def updateinstance(password,username,institutionid,type):
    try:
        password=password.encode('utf-8')
        encrypetedpwd = encryptsalt(password)
        k=updateinstancedb(encrypetedpwd,username,institutionid,type)
        return "Updated successfully"
    except Exception as e:
        return f"Error in updating instance {e}"

def instanceget(institutionid):
    try:
        result=getinstances(institutionid)
        result.rename(columns={'jsonendpoint':'endpoint','jsontype':'type'},inplace=True)
        return result
    except Exception as e:
        return "error ininstance get ",e

def instancetypeget(institutionid,type):

        result=getinstaceinfo(type,institutionid)
        print('result is ',result)
        endpoint=result['jsonendpoint'][0]
        print('endpoint is ',endpoint)
        username=result['username'][0]
        type=result['jsontype'][0]
        encpassword=result['instancePassword'][0]
        print('encpassword is ',encpassword)
        password=decryptsalt(encpassword)
        print("passwors is ",password)
        # result.rename(columns={'jsonendpoint': 'endpoint', 'jsontype': 'type'}, inplace=True)
        finalresult={'endpoint':endpoint,'username':username,'type':type,'password':password}
       # print(finalresult)
        return finalresult


# k=instancetypeget('A0494CF8-A800-47B7-93DB-0974B04A4568','issm')
# print(k)