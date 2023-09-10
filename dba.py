import pyodbc
import pandas as pd
conn = None

def connect():
    global conn
    conn = pyodbc.connect(
        'Driver={SQL Server};'
        #'server=
        'Server=GOVARDHAN;'
        'Database=master;'
        'Trusted_Connection=yes;'
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
                print(query)
                print("in select params")
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
            print("in commit")
            conn.commit()


    except Exception as e:
        print('Failed with', e)

    finally:
        cursor.close()