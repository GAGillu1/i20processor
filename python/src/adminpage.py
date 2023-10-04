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
    print(result)
    return result.reset_index(drop=True)
