import pandas as pd

from dbstatements import allusers, alllog, alluniversitties, getprocessed, pcinstitute


def adminusers():
    result=allusers()
    #print(result)
    return result.reset_index(drop=True)

def allprocessed():
    result=alllog()
    return result.reset_index(drop=True)

def allinstitutions():
    result=alluniversitties()
    return result.reset_index(drop=True)


def institutionsdat(institute):
    result=pcinstitute(institute)
    print(result)
    result=result.rename(columns={'email':'email','fullname':'adminFullName',"institutionName": "institutionName",
            "userName":"adminDisplayName"})
    email=result['email'][0]
    adminFullName=result['adminFullName'][0]
    institutionName=result['institutionName'][0]
    adminDisplayName=result['adminDisplayName'][0]
    crm=result['systemType'][0]

    return (email,adminFullName,institutionName,adminDisplayName,crm)
