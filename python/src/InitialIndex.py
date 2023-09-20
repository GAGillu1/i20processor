import pandas as pd
import datetime
from datetime import datetime

import issm_log
from io import StringIO
import os

from curreni20 import i20type, i20memo, i20type1,i20memoemp

today = datetime.today()
date = today.strftime('%Y%m%d')
cwd=os.getcwd()
"""creates index file """

def indexFile1(sevid, issm):
    try:
        # columns sevis id and admissions id are made as columns so we can read only those from the excel issm
        # assigning the list of sevis id's to sevis_ids
        employment_types = ['STEM OPT', 'OPT', 'CPT']
        sevis_ids = sevid
        df=pd.read_excel(issm,usecols=["SEVIS ID","Admissions Id"])
        merged_df=df[df['SEVIS ID'].isin(sevis_ids)]
        merged_df["Admissions Id"] = merged_df["Admissions Id"].astype(str).str.zfill(9)
        merged_df["Filename"] = merged_df["SEVIS ID"] + ".pdf"
        merged_df  ["material"] = "Continued i20"
        merged_df["Memo"]=""
        merged_df["STEM OPT"] = ""
        merged_df["OPT"] = ""
        merged_df["CPT"] = ""
        merged_df = merged_df.reset_index(drop=True)
        merged_df=merged_df.reindex(columns=['Admissions Id','SEVIS ID','material','Filename','Memo','CPT','OPT','STEM OPT'])
        size=len(merged_df)
        print(merged_df.head(0))
        print(merged_df)
        #merged_df.to_excel('abc.xlsx')
        for i in range(len(merged_df)):
            sevisid = merged_df.iloc[i]['SEVIS ID']
            #print(sevisid)
            i20formtype = i20type(cwd+'//'+sevisid + '.pdf')
            print('i20formtype',i20formtype)
            if 'CONTINUED ATTENDANCE' in i20formtype:
                print("continued path",cwd + '//' + sevisid + '.pdf')
                g = i20type1(cwd+'//'+sevisid + '.pdf')
                print("passed in g")
                typeofemployment = i20memoemp(g,cwd+'//'+sevisid+'.pdf')
                print(type(typeofemployment))
                print("TYPE OF EMP IS ",typeofemployment)

                for emp_type in employment_types:
                    if emp_type in typeofemployment and len(typeofemployment) > 1:
                        date_obj = datetime.strptime(typeofemployment[1], '%d %B %Y')
                        dateformat = date_obj.strftime('%Y%m%d')
                        print(dateformat)
                        merged_df.loc[merged_df['SEVIS ID'] == sevisid, emp_type] = dateformat
                print("type of employment is ", dateformat)

            elif "INITIAL ATTENDANCE" in i20formtype:
                merged_df.loc[merged_df['SEVIS ID'] == sevisid, 'Memo'] = i20formtype
        merged_df.to_csv("index_" + date + ".txt", index=False, sep='\t')
        # checking if any sevisid is not in txt file but is there in sevis id
        not_in_list = [x for x in sevid if x not in merged_df['SEVIS ID'].unique()]
        #Create an empty DataFrame to store the results

        table_html = ''
        if not_in_list:
            print("not in list",not_in_list)
            df2 = pd.read_excel(issm)
            df1 = pd.DataFrame(columns=['Admissions Id', 'Campus Id', 'SEVIS No', 'Lastname', 'First Name'])
            sevisids = (df2['SEVIS ID'].values)
            print(len(df2))

            for i in not_in_list:
                print("nooootttt in forrrr")
                if i in df:
                    uindex = df2[sevisids == i].index.values[0]
                    print(df2)
                    print(uindex)
                    print("uindec",uindex)
                    # userindex = df[usernames == user.lower()].index
                    lastname = df2['Passport Last Name'].iloc[uindex]
                    firstname = df2['Passport First Name'].iloc[uindex]
                    campusid = int(df2['Campus Id'].iloc[uindex])

                    df1 = df1._append({'Admissions Id': df['Admissions Id'].iloc[uindex], 'SEVIS No': i,
                                       'Last Name': lastname, 'First Name': firstname, 'Campus Id': campusid},
                                      ignore_index=True)

            table_html = df1.to_html(index=False)
        print("size is ",size)
        if size !=0:
            print("size is not  0")

            return size,not_in_list,table_html
        else:
            print("size  0")
            message="Please upload correct ISSM and Excel files . Index file size is 0"
            return message
    except Exception as e:
        issm_log.logger.error(f"Index file creation failed in initialindex.py {e}")

"""                if 'STEM OPT' in typeofemployment and len(typeofemployment)>1:
                    merged_df.loc[merged_df['SEVIS ID'] == sevisid, 'STEM OPT'] = (typeofemployment[1])
                elif 'OPT' in typeofemployment and len(typeofemployment) > 1:
                    merged_df.loc[merged_df['SEVIS ID'] == sevisid, 'OPT'] = (typeofemployment[1])
                elif 'CPT' in typeofemployment and len(typeofemployment) > 1:
                    merged_df.loc[merged_df['SEVIS ID'] == sevisid, 'CPT'] = (typeofemployment[1])
                merged_df.loc[merged_df['SEVIS ID'] == sevisid, 'Memo'] = (typeofemployment)"""
#indexFile1(['N0031368788','N0031664608'],'issm (2).xlsx','slate (2).xlsx')

"""creates index file """
#indexFile1(['N0034683525','N0034688552','N0034688553','N0034688554'],'issm.xlsx')
#indexFile1(['N0034688598', 'N0034688564', 'N0034688602', 'N0034688561', 'N0034688563', 'N0034688557', 'N0034688605', 'N0034688555', 'N0034688603', 'N0034688599', 'N0034688556', 'N0034688560', 'N0034688552', 'N0034688600', 'N0034688562', 'N0034688601', 'N0034688606', 'N0034683525', 'N0034688607', 'N0034688608', 'N0034688558', 'N0034688597', 'N0034688559', 'N0034688604', 'N0034688554', 'N0034688596', 'N0034688553'],'issm.xlsx')
def indexFile(sevid, issm):
    try:
        # columns sevis id and admissions id are made as columns so we can read only those from the excel issm
        sevis_ids = sevid
        print('sevis_ids are ',sevis_ids)
        df=pd.read_excel(issm,usecols=['SEVIS ID','Admissions Id'])
        merged_df = df[df["SEVIS ID"].isin(sevis_ids)]
        merged_df["Admissions Id"] = merged_df["Admissions Id"].astype(str).str.zfill(9)
        merged_df["Filename"] = merged_df["SEVIS ID"] + ".pdf"
        merged_df["I20 Issued Date"] = date
        merged_df["Material"] = "Sent i20"
        merged_df['Memo']=""
        #merged_df["Ref"] = merged_df["Ref"].astype(str).str.zfill(9)
        merged_df = merged_df.reset_index(drop=True)
        for i in range(len(merged_df)):
            sevisid = merged_df.iloc[i]['SEVIS ID']
            #print(sevisid)
            i20formtype = i20type(cwd+'\\'+sevisid + '.pdf')
            print(i20formtype)
            if 'CONTINUED ATTENDANCE' in i20formtype:
                g = i20type1(cwd+'\\'+sevisid + '.pdf')
                # print(g)
                typeofemployment = i20memo(g,cwd+'\\'+sevisid+'.pdf')
                #print(f)
                #print(aa)
                merged_df.loc[merged_df['SEVIS ID'] == sevisid, 'Memo'] = typeofemployment
            elif "INITIAL ATTENDANCE" in i20formtype:
                merged_df.loc[merged_df['SEVIS ID'] == sevisid, 'Memo'] = i20formtype
        merged_df.to_csv("index_" + date + ".txt", index=False,sep='\t')
        # checking if any sevisid is not in txt file but is there in sevis id
        not_in_list = [x for x in sevid if x not in merged_df['SEVIS ID'].unique()]
        #Create an empty DataFrame to store the results
        table_html=''
        if not_in_list:
            df = pd.read_excel(issm)
            df1 = pd.DataFrame(columns=['Admissions Id', 'Campus Id','SEVIS No', 'Lastname','First Name'])
            sevisids = (df['SEVIS ID'].values)
            for i in not_in_list:
                print(not_in_list)
                if i in df:
                    uindex = df[sevisids == i].index.values[0]

                    print("uindex",uindex)
                    print("index", uindex)
                    # userindex = df[usernames == user.lower()].index
                    lastname = df['Passport Last Name'].iloc[uindex]
                    firstname = df['Passport First Name'].iloc[uindex]
                    campusid = int(df['Campus Id'].iloc[uindex])

                    df1 = df1._append({'Admissions Id': df['Admissions Id'].iloc[uindex], 'SEVIS No': i,
                                       'Last Name': lastname, 'First Name': firstname, 'Campus Id': campusid},
                                      ignore_index=True)

                    table_html =df1.to_html(index=False)
        size = len(merged_df)
        if size !=0:
            print("size is not 0")
            print(table_html)
            return size,not_in_list,table_html
        else:
            print("size  zero")
            message="Please upload correct ISSM and Excel files . Index file size is 0"
            return message
    except Exception as e:
        print('error in index file  ',e)
        issm_log.logger.error(f"Index file creation failed in initialindex.py {e}")

