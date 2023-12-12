import logging
import os
import datetime

log_folder = os.path.join(os.getcwd(), 'logs')
if not os.path.exists(log_folder):
    os.makedirs(log_folder)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

def set_new_log_file():
    log_filename = os.path.join(log_folder, 'preprocessorlog' + datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.log')
    file_handler = logging.FileHandler(log_filename)
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    return log_filename

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)
#
# def file_logger():
#     log_folder = os.path.join(os.getcwd(), 'logs')
#     if not os.path.exists(log_folder):
#         os.makedirs(log_folder)
#
#     logger_name = logging.getLogger(__name__)
#     logger_name.setLevel(logging.DEBUG)
#
#     formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
#
#     log_filename = os.path.join(log_folder, f"preprocessorlog_{datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.log")
#     file_handler = logging.FileHandler(log_filename)
#     file_handler.setLevel(logging.DEBUG)
#     file_handler.setFormatter(formatter)
#
#     for handler in logger_name.handlers[:]:  # Remove any existing handlers
#         logger_name.removeHandler(handler)
#
#     logger_name.addHandler(file_handler)
#     return logger_name
#
# logger = file_logger()