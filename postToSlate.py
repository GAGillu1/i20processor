import requests
from cryptography.fernet import Fernet
from dbstatements import selectinstance, insertinstance
from python.src.encryption_decryption import encryptsalt

"""Decrypting the password with the key """
def decrypt(instancetype,universityname):
    result=selectinstance(instancetype, universityname)
    instanceUrl=result['instanceUrl'][0]
    username=result['username'][0]
    password=result['instancePassword'][0]
    key=result['instanceKey'][0]
    fernet=Fernet(key)
    decrypted_password = fernet.decrypt(password)
    return instanceUrl,username,decrypted_password.decode()

"""Posting the files to slate"""
def post(file, instance):
    client_url,username,pw = decrypt(instance, 'University Of New Haven')

    print(client_url,username,pw)
    password = pw
    # Define the file to upload
    file_path  = file
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

#insertinstance('tesu', 'grad', 'tester', 'testerpwd' ,'A0494CF8-A800-47B7-93DB-0974B04A4568')
def instanceinsert(url,type,username,password,universityid):
    try:
        print("inin i")
        password=password.encode('utf-8')
        encrypetedpwd=encryptsalt(password)
        print(encrypetedpwd)
        k=insertinstance(url,type,username,encrypetedpwd,universityid)
        print(k)
        return 'Instance inserted successfully'
    except Exception as e:
        return f"Error in inserting instance {e}"

