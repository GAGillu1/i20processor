import json

import bcrypt
import pandas as pd

from dbstatements import allusers, alllog, alluniversitties, getprocessed, pcinstitute, insertinstitutions, insertpc
from login import registeruser, generate_random_string
from issm_log import jsonconvert


def adminusers():
    result=allusers()
    #print(result)
    return result.reset_index(drop=True)

def allprocessed():
    result=alllog()
    result['processedMsg'] = result['processedMsg'].apply(jsonconvert)
    result['processedDate'] = pd.to_datetime(result['processedDate'], format='%Y:%m:%d %H:%M:%S.%f')
    result['processedDate'] = result['processedDate'].apply(lambda x: x.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z')

    #result['processedMsg']=result['processedMsg'].apply(json.loads)
    return result.reset_index(drop=True)

def allinstitutions():
    result=alluniversitties()
    return result.reset_index(drop=True)


def institutionsdat(institute):
    result=pcinstitute(institute)
    result=result.rename(columns={'email':'email','fullname':'adminFullName',"institutionName": "institutionName",
            "userName":"adminDisplayName"})
    email=result['email'][0]
    adminFullName=result['adminFullName'][0]
    institutionName=result['institutionName'][0]
    adminDisplayName=result['adminDisplayName'][0]
    crm=result['systemType'][0]

    return (email,adminFullName,institutionName,adminDisplayName,crm)

def institutioninsert(institutionname,systemType,fullname,username,email,contact,role):

    resultinst=insertinstitutions(institutionname,systemType)
    salt=bcrypt.gensalt()
    password=generate_random_string()
    stringsalt=salt.decode('utf-8')
    #hashing the password with the generated salt
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
    pwd=password_hash.decode('utf-8')
    if resultinst =="success":
        result=insertpc(fullname, username, email, role, institutionname, salt, pwd, contact)
        if result=="success":
            return "success"
        else:
            return "primary contact insertion failed"
    else:
        return "Institution inserting is failed"




# username='username'
# fullname='fullname'
# institutionname='University Of New Haven admin'
# email='email.com'
# contact='232032312'
# role='PrimaryContact'
# systemType='type'
# institutioninsert(institutionname,systemType,fullname,username,email,contact,role)