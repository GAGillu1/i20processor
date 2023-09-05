
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
        print(result)
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
    query=" update  users set salt=?,hash=? where userName=?"
    dba.execute_query(query,[salt,hash,username])
    dba.close()


def updateuser(username,fullname,email,role,active):
    dba.connect()
    query="update users set fullname=?,email=?,userRole=?,active=? where userName=?"
    dba.execute_query(query,[fullname,email,role,active,username])
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

def insertinstance(url,msg,username,password,universityid):
    dba.connect()
    query="insert into instance(jsonendpoint,jsontype,username,instancePassword,institutionID) values(?,?,?,?,?)"
    dba.execute_query(query,[url,msg,username,password,universityid])
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

def updatelogin(user):
    dba.connect()
    query="update users set last_login= ? where username=? "
    dba.execute_query(query,[today,user])
    dba.close()

def userdata(username):
    dba.connect()
    query="select fullname,email,userRole ,active from users where userName=?"
    result=dba.execute_query(query,[username])

    if result is not None:
        # Use the result DataFrame as needed.

        return result.reset_index(drop=True)
    else:
        print("No data returned from the query.")
    dba.close()

# def updateactive(user,activeid):
#     dba.connect()
#     query="select active from users where username=?"
#     result = dba.execute_query(query,user)
#     print(result)
#     active=result['active'][0]
#     print(active)
#
#     print(active!=activeid)
#     #print((active==False or active =True))
#     if (active!= activeid) and (active == False or active ==True):
#         print("inn")
#         if active==True:
#             query="update users set active =0 where username =?"
#             dba.execute_query(query,user)
#         elif active==False:
#             query = "update users set active =1 where username =?"
#             dba.execute_query(query, user)
#             print("in")
#
#
#     dba.close()

def updateactive(user, activeid):
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




# updateuser('test','abc','def','DDSO')
#insertinstitutions('University of New Haven2',cursor,conn)
#selectinstitutions()

#insertadmin('Govardhan','Illuru','example','Admin','University of New Haven')
#selectadministrators()


#selectusers()
#selectinstitutions()