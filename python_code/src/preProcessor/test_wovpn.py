import sys
sys.path.append("preProcessor")
sys.path.append("src")
from TestingBulk import testing_main
from issmfilelog import logger
from dbstatements import insertppreprocessed
# from python_code.src.dbstatements import insertppreprocessed
from final_log_excel import insert_into_excel_file
from flask import request
# import time
def vpn_function_bulk(issm_username, issm_password, excel_file, instance, socketio):
    status = None
    json_response = None
    message = f"exception in test_wovpn.py file vpn_function"
    session_result = "Failure"
    backend_processor = "Pre Processor"
    user_name = request.headers.get('username')
    logger.info(f"user in request header: {user_name}")
    institution_id = request.headers.get('institutionid')
    logger.info(f"institution in request header: {institution_id}")
    log_response = ""
    try:
        logger.info(f"starting vpn_function in test_wovpn file")
        # print(f"starting vpn_function in test_wovpn file")
        if instance == "Prod":
            # input_url = "issm-prod.newhaven.edu"
            input_url = "https://issm-prod.newhaven.edu"
        elif instance == "Test":
            input_url = "https://issm-test.newhaven.edu"
        else:
            message = "Wrong instance name entered"
            raise Exception
        logger.info(f"input url: {input_url}")
        status, message, json_response = testing_main(input_url, excel_file, socketio, issm_username, issm_password)
        # browser.quit()  # irrespective of success or failure we are quitting the driver
        logger.info("new tab successfully redirected")
    except Exception as e:
        # errorMessage = f"exception in test_wovpn.py file vpn_function"
        print(f"{message}, {e}")
        insertppreprocessed(user_name, log_response, institution_id, session_result, message, backend_processor)
        insert_into_excel_file(user_name, log_response, institution_id, session_result, message, backend_processor)
    logger.info(f"Logout success and driver quit and status: {status}, message: {message}")
    # Close the WebDriver when done
    # browser.quit()
    return status, message, json_response
