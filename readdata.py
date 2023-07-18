import pandas as pd
from flask import jsonify
import os

cwd=os.getcwd()
timesheet=cwd+r"/timesheet"

def namesread():
    #reading the excel status sheet
    df = pd.read_excel(timesheet+r"/Names.xlsx")
    #sorting values based on employee name
    df=df.sort_values(by=['Names'])
    #data with employee name column
    names=df['Names']
    print(names)
    #retuning the names and dropping the index and if empty nothing is returned
    return names.reset_index(drop=True) if not names.empty else None

def statusread():
    #reading the excel status sheet
    df1=pd.read_excel(timesheet+r"/Logs.xlsx", sheet_name="Logs")
    #renaming the colum name from EMployee Name to Name
    df1 = df1.rename(columns={'Employee Name': 'Name'})
    #sorting the dataframe with Name column
    df1=df1.sort_values(by=['Name'])
    summary = df1.groupby('Name')['Hours'].sum().reset_index()
    print("summaryyy",summary)
    #returning the dataframe and dropping index number and if empty None is returned
    #return summary.reset_index(drop=True) if not df1.empty else None
    if not summary.empty:
        f=summary.reset_index(drop=True) if not summary.empty else None
        #returning the dataframe and dropping index . If empty then None is returned
        return jsonify({'Log': f.to_dict('records')})
    else:
        msg="Employee not found"
        return msg
def logsread():
    #reading the excel logs sheet which has all logs
    df2=pd.read_excel(timesheet+r"/Logs.xlsx", sheet_name="Logs")
    #changing the columns names to make it easy in Jscript, Employee Name to Name ,Start Time to Stime,End Time to Etime
    df2=df2.rename(columns={'Employee Name':'Name','Start Time':'Stime','End Time':'Etime'})
    df2=df2.rename(columns={'Employee Name':'Name','Start Time':'Stime','End Time':'Etime'})
    print(df2)
    df2 = df2.sort_values(by=['Stime'],ascending=False)

    #returning the dataframe and dropping index number. If empty dataframe then None is returned
    #return df2.reset_index(drop=True) if not df2.empty else None
    if not df2.empty:
        f=df2.reset_index(drop=True) if not df2.empty else None
        #returning the dataframe and dropping index . If empty then None is returned
        return jsonify({'Log': f.to_dict('records')})
    else:
        msg="Employee not found"
        return msg

def logusers(user):
    #reading the logs sheet from excel
    df3=pd.read_excel(timesheet+r"/Logs.xlsx", sheet_name="Logs")
    #changing the column names from Employee Name to Name, Start Time to Stime and End Time to Etime
    userlog = df3.rename(columns={'Employee Name': 'Name', 'Start Time': 'Stime', 'End Time': 'Etime'})
    #sorting the dataframe with starttime and keeping in descending order which means the latest one will be on top
    userlog = userlog.sort_values(by=['Stime'],ascending=False)

    print(type(userlog['Stime']))
    #taking the data only with given name using pandas query
    #userlog = userlog.query("Name==@user")
    userlog=userlog[userlog["Name"]==user]



    print(userlog)
    if not userlog.empty:
        f=userlog.reset_index(drop=True) if not userlog.empty else None
        #returning the dataframe and dropping index . If empty then None is returned
        return jsonify({'Log': f.to_dict('records')})
    else:
        msg="Employee not found"
        return msg

