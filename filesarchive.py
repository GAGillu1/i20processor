import os
import zipfile
import datetime

today = datetime.datetime.today()
date = today.strftime('%Y%m%d')
timestamp=datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
cwd = os.getcwd()

archdir = cwd + r"\archivedfiles"


def logarchive():
    filenam='logarchive_'+timestamp+".zip"
    dir=cwd+"\log"
    archdir=cwd+r"\archivedfiles"

    os.chdir(dir)
    with zipfile.ZipFile(os.path.join(archdir, filenam), "w", compression=zipfile.ZIP_DEFLATED) as zip_file:
        for filename in os.listdir('.'):
            if filename.endswith('.log') :
                print(filename)
                zip_file.write(filename)
                os.remove(filename)




def ziparchive():
    filenam='signedfilsarchive_'+timestamp+".zip"
    archdir=cwd+r"\archivedfiles"

    with zipfile.ZipFile(os.path.join(archdir, filenam), "w", compression=zipfile.ZIP_DEFLATED) as zip_file:
        for filename in os.listdir('.'):
            if filename.endswith('.zip'):
                zip_file.write(filename)
                os.remove(filename)





ziparchive()
#
logarchive()