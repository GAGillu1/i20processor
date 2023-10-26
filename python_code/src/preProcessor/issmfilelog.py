# import logging
# import datetime
# import os
#
# log_folder = os.path.join(os.getcwd(), 'log')
# if not os.path.exists(log_folder):
#     os.makedirs(log_folder)
#
#
# def set_new_log_file():
#     log_filename = os.path.join(log_folder, 'issmlog' + datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.log')
#     file_handler = logging.FileHandler(log_filename)
#     file_handler.setLevel(logging.DEBUG)
#     file_handler.setFormatter(formatter)
#     logger.addHandler(file_handler)
#     return log_filename
# logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)
# formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

import os
import logging
import datetime

# Setting up folders
cwd = os.getcwd()
parent_dir = os.path.dirname(cwd)
log_folder = os.path.join(parent_dir, 'log')
if not os.path.exists(log_folder):
    os.makedirs(log_folder)

# Setting up logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

def set_new_log_file():
    # Remove existing file handlers
    for handler in logger.handlers[:]:
        if isinstance(handler, logging.FileHandler):
            logger.removeHandler(handler)

    log_filename = os.path.join(log_folder, 'issmtoslate_' + datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.log')
    file_handler = logging.FileHandler(log_filename)
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

# Ensure that we set a new log file initially
