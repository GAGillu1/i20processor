import logging
import datetime
import os
import pandas as pd
from dbstatements import getprocessed

cwd=os.getcwd()
parent_dir = os.path.dirname(cwd)
log_folder = os.path.join(parent_dir,'log')
print(log_folder)
if not os.path.exists(log_folder):

    os.makedirs(log_folder)


def set_new_log_file():
    log_filename = os.path.join(log_folder, 'issmtoslate_' + datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.log')
    file_handler = logging.FileHandler(log_filename)
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

def processedgetter():
    df=getprocessed()
    df['processedDate']=pd.to_datetime(df['processedDate'])
    df['processedDate'] = df['processedDate'].dt.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
    return df
