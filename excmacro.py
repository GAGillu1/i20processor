import pandas as pd
import os
cwd=os.getcwd()
timesheet=cwd+r"/timesheet"
def macros(empname, starttime,endtime,hours,comments):

    df=pd.read_excel(timesheet+r'/Logs.xlsx',sheet_name='Logs')
    print("macrossss",df)
    data=pd.DataFrame({'Employee Name':[empname],'Start Time':[starttime],'End Time':[endtime],'Hours':[hours],'Comments':[comments]})
    df = pd.concat([df, data], ignore_index=True)
    #df1=pd.read_excel('Book1.xlsx',sheet_name='Status')
    print(df)
    #names=df1['Employee Name']
    #print(names)
    #summary = df.groupby('Employee Name')['Hours'].sum().reset_index()
    #summary.to_excel('Book1.xlsx',sheet_name='Status')
    with pd.ExcelWriter(timesheet+r'/Logs.xlsx') as writer:
        df.to_excel(writer, sheet_name='Logs', index=False)



#macros('Govardhan','21:30','22:30',2,'abc')













