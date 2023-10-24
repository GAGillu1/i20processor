import sys
sys.path.append("preProcessor")
sys.path.append("src")
# from selenium.common import NoSuchElementException
# from selenium.webdriver.common.by import By
from TestingBulk import testing_main
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as ec
from issmfilelog import logger
# from selenium.webdriver.chrome.service import Service
from dbstatements import insertppreprocessed
# from python_code.src.dbstatements import insertppreprocessed
from flask import request
# import time
def vpn_function_bulk(issm_username, issm_password, excel_file, instance, socketio):
    status = None
    message = ""
    sessionResult = "Failure"
    backendProcessor = "Pre Processor"
    userName = request.headers.get('username')
    logger.info(f"user in request header: {userName}")
    institutionId = request.headers.get('institutionid')
    logger.info(f"institution in request header: {institutionId}")
    logResponse = ""
    try:
        logger.info(f"starting vpn_function in test_wvpn file")
        print(f"starting vpn_function in test_wvpn file")
        if instance == "Prod":
            # input_url = "issm-prod.newhaven.edu"
            input_url = "https://issm-prod.newhaven.edu"
        elif instance == "Test":
            input_url = "https://issm-test.newhaven.edu"
        else:
            message = "Wrong instance name entered"
            errorMessage = "Wrong instance name entered"
            insertppreprocessed(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
            raise Exception
        logger.info(f"input url: {input_url}")
        status, message = testing_main(input_url, excel_file, socketio, issm_username, issm_password)
        # browser.quit()  # irrespective of success or failure we are quitting the driver
        logger.info("new tab successfully redirected")
    except Exception as e:
        errorMessage = f"exception in test_wvpn.py file vpn_function"
        print(f"{errorMessage}, {e}")
        insertppreprocessed(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
    logger.info(f"Logout success and driver quit and status: {status}, message: {message}")
    # Close the WebDriver when done
    # browser.quit()
    return status, message
