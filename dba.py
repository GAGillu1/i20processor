import pyodbc
import pandas as pd
conn = None

def connect():
    global conn
    conn = pyodbc.connect(
        'Driver={SQL Server};'
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
        if 'select' in query:
            if params :
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
            cursor.commit()





    except Exception as e:
        print('Failed with', e)

    finally:
        cursor.close()