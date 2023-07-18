import pyodbc
import pandas as pd
import dba
import datetime
today = datetime.datetime.today()
print(today)
date = today.strftime('%Y%m%d_%H%M%S')
timestamp=datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
def selectinstitutions():
    dba.connect()
    query = 'SELECT institutionId,institutionName,systemType FROM Institutions'
    result=dba.execute_query(query)
    dba.close()
    if result is not None:
        # Use the result DataFrame as needed
        print(result)
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")


def selectadministrators():
    dba.connect()
    query='select fullname,email,userRole,institutionId from InsitutionAdministrators'
    result = dba.execute_query(query)
    if result is not None:
        # Use the result DataFrame as needed
        print(result)
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()


def selectusers():
    dba.connect()
    query="select userId,fullname,userName,email,institutionId,salt,hash,active,userRole from users where active=1 "
    result = dba.execute_query(query)
    if result is not None:
        # Use the result DataFrame as needed.
        print(result)
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()

def deleteusers(user):
    dba.connect()
    query="update users set active =0 where userName=? "
    result=dba.execute_query(query,user)
    dba.close()


def insertinstitutions(institutionname,systemType):
    dba.connect()

    query='''
        INSERT INTO Institutions (institutionName,systemType) values(?,?)
        '''
    dba.execute_query(query,[institutionname,systemType])

    dba.close()

def insertadmin(fullname,email,institutionname):
    dba.connect()
    query='''insert into InsitutionAdministrators (fullname,email,userRole,institutionId,result) values(?,?,'ADMIN',(select institutionId from Institutions where institutionName=?)) '''
    dba.execute_query(query, [fullname,email,institutionname])

    dba.close()

def insertusers(fullname,username,email,userrole,institutionname,salt,hash):
    dba.connect()
    query="insert into users(fullname,userName,email,userRole,institutionId,salt,hash,active) values(?,?,?,?,(select institutionId from Institutions where institutionName=?),?,?,1)"
    dba.execute_query(query, [fullname,username,email, userrole, institutionname,salt,hash])
    dba.close()


def selectsignature():
    dba.connect()
    query='select fullName,userName,email,signatureLength,signatureWidth,signatureXCordinate,signatureYCordinate from signatures'
    result=dba.execute_query(query)
    if result is not None:
        # Use the result DataFrame as needed
        print(result)
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()

def selectsignaturename():
    dba.connect()
    query="select fullName from signatures"
    result=dba.execute_query(query)
    if result is not None:
        # Use the result DataFrame as needed.
        print(result)
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()

def insertsignatures(fullName,userName,email,signatureLength,signatureWidth,signatureXCordinate,signatureYCordinate,universityname):
    dba.connect()
    query="insert into signatures(fullName,userName,email,signatureLength,signatureWidth,signatureXCordinate,signatureYCordinate,institutionId)  values(?,?,?,?,?,?,?,?)"
    dba.execute_query(query,[fullName,userName,email,signatureLength,signatureWidth,signatureXCordinate,signatureYCordinate,universityname])
    dba.close()
def updatepass(username,salt,hash):
    dba.connect()
    query=" update  users set salt=?,hash=? where username=?"
    dba.execute_query(query,[salt,hash,username])
    dba.close()


def updateuser(username,fullname,email,role):
    dba.connect()
    query="update users set fullname=?,email=?,userRole=? where userName=?"
    dba.execute_query(query,[fullname,email,role,username])
    dba.close()

def updatesignature(username,fullname,email,signaturelength,signaturewidth,signaturexcordinate,signatureycordinate):
    dba.connect()
    query="update signatures set fullName= ?, email= ?, signatureLength= ?, signatureWidth= ?, signatureXCordinate= ?, signatureYCordinate= ? where userName=?"
    dba.execute_query(query,[fullname,email,signaturelength,signaturewidth,signaturexcordinate,signatureycordinate,username])
    dba.close()

def insertprocessed(user,msg,institutionid,result):
    dba.connect()
    print(msg)
    query="insert into processed(processedDate,processedBy,processedMsg,institutionId,result) values(?,?,?,?,?)"
    dba.execute_query(query,[today,user,msg,institutionid,result])
    dba.close()

def insterinstance(url,msg,username,password,key,universityname):
    dba.connect()
    query="insert into instance(instanceUrl,intanceMsg,username,instancePassword,instanceKey,institutionID) values(?,?,?,?,?,(select institutionId from Institutions where institutionName=?))"
    dba.execute_query(query,[url,msg,username,password,key,universityname])
    dba.close()

def selectinstance(instancetype,universityname):
    dba.connect()
    query="select instanceUrl,username,instancePassword,instanceKey from instance where instanceMsg=? and institutionID=(select institutionId from Institutions where institutionName=?)"
    result=dba.execute_query(query,[instancetype,universityname])
    if result is not None:
        # Use the result DataFrame as needed.
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()

# updateuser('test','abc','def','DDSO')
#insertinstitutions('University of New Haven2',cursor,conn)
#selectinstitutions()

#insertadmin('Govardhan','Illuru','example','Admin','University of New Haven')
#selectadministrators()


#insertusers('Govardhan','Illuru','example','User','University of New Haven')
#selectusers()
#selectinstitutions()