
import pandas as pd

from dbstatements import selectinstitutions, selectsignature, selectusers, insertsignatures , selectsignaturename, updatesignature


def names_list():
    #df1=pd.read_excel("signature.xlsx")
    df1=selectsignaturename()
    print(df1)
    #print(df1)
    filtered_df=df1['fullName']

    return filtered_df.reset_index(drop=True) if not filtered_df.empty else None

def signaturefile(name):

    #dataf=pd.read_excel("signature.xlsx")
    dataf=selectsignature()
    filtered_df = dataf[dataf["fullName"] == name]
    user = filtered_df.iloc[0]["userName"]
    file=user+".png"
    return file

def signadd(username,length,width,xco,yco):
   try:

        #df=pd.read_excel('signature.xlsx')
        #df=selectsignature()
        #df1=pd.read_excel('user.xlsx')

        df1=selectusers()
        df=selectsignature()
        print(type(df1))
        print(df1)
        print("username is ",username)
        user_df = df1.loc[df1['userName'] == username]
        sign_df=df.loc[df['userName']==username]
        print("userdf ",user_df)

        if not user_df.empty and sign_df.empty:
            print("in ")
            fullname=user_df['fullname'][0]
            universityid=int(user_df['institutionId'][0])
            print(universityid)
            print(fullname)
            print("46546549874")
            print("full",fullname[0])
            email=user_df['email'][0]
            #newsign={'Full Name':fullname,'username':username,'Email':email,'signaturelength':length,'signaturewidth':width,'signaturexcoordinate':xco,'signatureycoordinate':yco}
            #df = pd.concat([df, pd.DataFrame(newsign, index=[0])], ignore_index=True)
            insertsignatures(fullname, username, email, length, width, xco,yco,universityid)
            #insertdso(firstname,lastname,email,userrole,institutionname)
            # df.to_excel('signature.xlsx')
            print("Signature added Successfully")
            return "Signature added Successfully"

        elif not user_df.empty and not sign_df.empty:
            fullname = user_df['fullname'][0]
            email = user_df['email'][0]
            updatesignature(username, fullname, email, length, width, xco,yco)
        else:
            return "Signature Cannot be added as username is not registered in  System"


   except Exception as e:
       print(e)
       return e


