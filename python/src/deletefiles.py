import asyncio
import os
import datetime


today = datetime.datetime.today()
date = today.strftime('%Y%m%d')
def remove_files():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(async_remove_files())
    loop.close()

async def async_remove_files():
    try:
        for file_name in os.listdir('.'):
            if (file_name.endswith('.pdf') or file_name.endswith('.xlsx')) and file_name != "user.xlsx" and not file_name.startswith('signature') and not file_name.endswith('.py'):
                os.remove(file_name)
            if file_name=="index_" + date + ".txt":
                os.remove(file_name)
        print("success in deleting the files ")
    except Exception as e:
        print(" error in deleting the files ",e)