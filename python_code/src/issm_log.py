import json
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


def jsonconvert(value):
    try:
        # Try converting to json
        json_obj = json.loads(value)
        if isinstance(json_obj, list):  # If it's a list after conversion, revert it back to string
            return value
        return json_obj
    except json.JSONDecodeError:
        # If it's not JSON, return the original value
        return value
def processedgetter(institutionid):
    print("isnt id is ",institutionid)
    df=getprocessed(institutionid)
    df['processedDate'] = pd.to_datetime(df['processedDate'], format='%Y:%m:%d %H:%M:%S.%f')
    df['processedDate'] = df['processedDate'].apply(lambda x: x.strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z')
    df['processedMsg'] = df['processedMsg'].apply(jsonconvert)
    print(df)
    return df

