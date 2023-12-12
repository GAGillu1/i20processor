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
        # 'server=DESKTOP-CLVI71Q\SQLEXPRESS;'
        'Server=172.19.97.157,1433;'
        'Database=issm_test;'
        'UID=SuperAdmin;'
        'PWD=#nXHa&Ydkx6q36Gf;'
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
                print(query)
                cursor.execute(query,params)
                rows=cursor.fetchall()
            else:
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
            print("Near commit")
            k=cursor.rowcount
            if k==1:
                print("Suceess in db")
                return "success"
            else:
                print("Failed in db")
                return 'failed'


    except Exception as e:
        return e

    finally:
        cursor.close()