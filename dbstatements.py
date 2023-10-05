
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

def activeusers():
    dba.connect()
    query = "select userId,fullname,userName,email,salt,hash,active,userRole,institutionid from users where active=1 "
    result = dba.execute_query(query)
    if result is not None:
        # Use the result DataFrame as needed.
        print(result)
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()
def loginusers():
    dba.connect()
    query="SELECT u.userId,u.fullname, u.userName,  u.email,  u.salt, u.hash, u.active, u.userRole, u.institutionid,  i.institutionName  from  users u JOIN   institutions i ON u.institutionid = i.institutionid WHERE   u.active = 1"
    result=dba.execute_query(query)
    if result is not None:
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()


def selectusers(institutionid):
    dba.connect()
    query="select userId,fullname,userName,email,salt,hash,active,userRole,institutionId from users where institutionId=? "
    result = dba.execute_query(query,[institutionid])
    if result is not None:
        # Use the result DataFrame as needed.
        print(result)
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()
#selectusers('A0494CF8-A800-47B7-93DB-0974B04A4568')
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
def insertusers(fullname,username,email,userrole,institutionid,salt,hash):
    dba.connect()
    query="insert into users(fullname,userName,email,userRole,institutionId,salt,hash,active) values(?,?,?,?,?,?,?,1)"
    dba.execute_query(query, [fullname,username,email, userrole, institutionid,salt,hash])
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
def updatepass(email,salt,hash):
    dba.connect()
    query=" update  users set salt=?,hash=? where email=?"
    dba.execute_query(query,[salt,hash,email])
    dba.close()


def updateuser(user,fullname,email,role,active):
    dba.connect()
    query="update users set fullname=?,userRole=?,active=? where email=?"
    dba.execute_query(query,[fullname,role,active,email])
    dba.close()

def updatesignature(username,fullname,email,signaturelength,signaturewidth,signaturexcordinate,signatureycordinate):
    dba.connect()
    query="update signatures set fullName= ?, email= ?, signatureLength= ?, signatureWidth= ?, signatureXCordinate= ?, signatureYCordinate= ? where userName=?"
    dba.execute_query(query,[fullname,email,signaturelength,signaturewidth,signaturexcordinate,signatureycordinate,username])
    dba.close()

def insertprocessed(user,msg,institutionid,result,processor):
    dba.connect()
    print(msg)
    query="insert into processed(processedDate,processedBy,processedMsg,institutionId,result,processor) values(?,?,?,?,?,?)"

    dba.execute_query(query,[today,user,msg,institutionid,result,processor])
    dba.close()

def insertinstance(url,msg,username,password,universityid):
    dba.connect()
    query="insert into instance(jsonendpoint,jsontype,username,instancePassword,institutionID) values(?,?,?,?,?)"
    dba.execute_query(query,[url,msg,username,password,universityid])
    dba.close()

def selectinstance(instancetype,institutionid):
    dba.connect()
    query="select jsonendpoint,username,instancePassword from instance where jsontype=? and institutionID=?"
    result=dba.execute_query(query,[instancetype,institutionid])
    if result is not None:
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()

def updatelogin(user):
    dba.connect()
    query="update users set last_login= ? where email=? "
    dba.execute_query(query,[today,user])
    dba.close()

def userdata(email):
    dba.connect()
    query="select fullname,userRole ,active from users where email=?"
    result=dba.execute_query(query,[email])
    if result is not None:
        # Use the result DataFrame as needed.
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()

def getinstaceinfo(type,institutionid):
    dba.connect()
    query="select jsonendpoint,username,instancePassword,jsontype from instance where jsontype=? and institutionID=? "
    result=dba.execute_query(query,[type,institutionid])
    if result is not None:
        # Use the result DataFrame as needed.

        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()

def updateactive(user,activeid):
    dba.connect()
    query = "select  active from  users where username = ?"
    result = dba.execute_query(query, user)
    active = result['active'][0]

    if active != activeid and active in (False, True):
        new_active = 0 if active else 1
        query = "UPDATE users SET active = ? WHERE username = ?"
        dba.execute_query(query, [new_active, user])
    else:
        print("Unchanged")
    dba.close()

#updateactive("GOV", 1)

def getprocessed(institutionid):
    dba.connect()
    print("inst id is ",institutionid)
    query='select processedDate, processedBy, processedMsg,result,processor from processed where institutionid=?'
    result=dba.execute_query(query,[institutionid])
    if result is not None:
        # Use the result DataFrame as needed.
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()


def updateinstancedb(password,username,institutionid,type):
    dba.connect()
    query="update instance set instancePassword =? ,username=? where institutionID=? and jsontype=?"
    dba.execute_query(query,[password,username,institutionid,type])
    dba.close()


def getinstances(institutionid):
    dba.connect()
    query='select jsonendpoint,jsontype,username from instance where institutionID=?'
    result = dba.execute_query(query,[institutionid])
    if result is not None:
        # Use the result DataFrame as needed.
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()

def allusers():
    dba.connect()
    query='select fullname, email,userName from users '
    result = dba.execute_query(query)
    if result is not None:
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query")
    dba.close()

def alllog():
    dba.connect()
    query='select p1.processedDate,p1.processedBy,p1.ProcessedMsg,p1.result, p1.processor,p2.institutionName from processed p1  join institutions p2 on p1.institutionid=p2.institutionid'
    result=dba.execute_query(query)
    if result is not None:
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query")
    dba.close()

def alluniversitties():
    dba.connect()
    query='select institutionName from institutions'
    result=dba.execute_query(query)
    if result is not None:
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query")
    dba.close()

def pcinstitute(institute):
    dba.connect()
    query="select p1.fullname,p1.userName,p1.email,p2.institutionName,p2.systemType from users p1  join institutions p2 on p1.institutionid=p2.institutionid where userRole='PrimaryContact' and p2.institutionName=?"
    result=dba.execute_query(query,institute)
    if result is not None:
        return result.reset_index(drop=True)
    else:
        print("No data returned from the query")
    dba.close()

def insertppreprocessed(user, msg, institutionid, result,errormessage, processor):
    dba.connect()
    query = "insert into processed(processedDate,processedBy,processedMsg,institutionId,result,processor,errormessage) values(?,?,?,?,?,?,?)"
    dba.execute_query(query, [today, user, msg, institutionid, result, processor,errormessage])
    dba.close()
# updateuser('test','abc','def','DDSO')
#insertinstitutions('University of New Haven2',cursor,conn)
#selectinstitutions()

#insertadmin('Govardhan','Illuru','example','Admin','University of New Haven')
#selectadministrators()


#selectusers()
#selectinstitutions()