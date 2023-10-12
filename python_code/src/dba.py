import pyodbc
import pandas as pd
conn = None

def connect():
    global conn
    conn = pyodbc.connect(
        'Driver={ODBC Driver 17 for SQL Server};'
        #'Server=localhost\SQLEXPRESS;'
        #'Server=GOVARDHAN;'
        #'server=database-1.cz8ykoavtu1t.us-east-2.rds.amazonaws.com;'
        'server=database-2.cz8ykoavtu1t.us-east-2.rds.amazonaws.com;'
        'Database=issm_test;'
        'UID=admin;'
        'PWD=password123;'
        #'Trusted_Connection=yes;'

    )

def close():
    global conn
    if conn:
        conn.close()
        conn = None


def execute_query(query, params=None):
    global conn
    cursor = conn.cursor()
    try:
       # if 'select' in query:
        if query.strip().lower().startswith('select'):
            if params :
                #print(query)
                print("in select params")
                print(query)
                cursor.execute(query,params)
                rows=cursor.fetchall()
            else:
                print("in select no params")
                cursor.execute(query)
                rows = cursor.fetchall()
            if rows:
                # Get the column names from the cursor description
                column = [col[0] for col in cursor.description]
                data = pd.DataFrame.from_records(rows, columns=column)
                return data.reset_index(drop=True)
        else:
            cursor.execute(query, params)
            conn.commit()
            k=cursor.rowcount
            if k==1:
                return "success"
            else:
                return 'failed'


    except Exception as e:
        print('Failed with', e)

    finally:
        cursor.close()