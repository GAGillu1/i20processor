import sys
sys.path.append("preProcessor")
sys.path.append("src")
from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver.common.by import By
from TestingSingle import testing_main
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from issmfilelog import logger
# from selenium.webdriver.chrome.service import Service
# from dbstatements import insertppreprocessed
from final_log_excel import insert_into_excel_file
# from python_code.src.dbstatements import insertppreprocessed
from flask import request
import time
def vpn_function(vpn_username, vpn_password, issm_username, issm_password, excel_file, instance, socketio):
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
        login_url = "https://sslvpn.newhaven.edu/remote/login?&lang=en"
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-dev-shm-usage")
        # chrome_options.binary_location = '/usr/bin/google-chrome'
        chrome_options.page_load_strategy = 'normal'

        # added below code for amazon linux instance
        # chromedriver_path = '/usr/bin/chromedriver'
        # Create a Service instance with the specified path
        # service = Service(chromedriver_path)
        # Use the Service when creating the Chrome browser instance
        print("before start of webdriver")
        # browser = webdriver.Chrome(service=service, options=chrome_options)
        # commented the below line for amazon instance.
        browser = webdriver.Chrome(options=chrome_options)
        # browser = webdriver.Chrome()
        # driver = webdriver.Chrome()  # You may need to specify the path to the chromedriver executable
        print("before url")
        browser.get(login_url)
        time.sleep(1)
        logger.info("before entering username")
        print("before entering username")
        socketio.emit('preProcessor', 2.0)
        browser.find_element(By.XPATH, '//*[@id="username"]').send_keys(vpn_username)
        time.sleep(1)
        logger.info(f"before credentials")
        print("before credentials")
        browser.find_element(By.XPATH, '//*[@id="credential"]').send_keys(vpn_password)
        time.sleep(1)
        browser.find_element(By.ID, 'login_button').click()
        socketio.emit('preProcessor', 3.0)
        try:
            time.sleep(1)
            vpn_login_error = browser.find_element(By.ID, 'err_val')
            error_text = vpn_login_error.text
            logger.error(error_text)
            errorMessage = "Invalid VPN username or password"
            # insertppreprocessed(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
            insert_into_excel_file(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
            browser.quit()
            return False, errorMessage
        except NoSuchElementException:
            logger.info("VPN login success")
            #  add quick connection button  --  added
            # time.sleep(15)
            wait = WebDriverWait(browser, 10)  # 10 seconds timeout
            element = wait.until(
                ec.visibility_of_element_located((By.XPATH, '//*[@id="navbar-view-section"]/div/div/div[2]/div[2]/button[1]')))
            # Click the element
            element.click()
            # input_url = ""
            # time.sleep(2)
            if instance == "Prod":
                # input_url = "issm-prod.newhaven.edu"
                input_url = "issm-prod"
            elif instance == "Test":
                input_url = "issm-test.newhaven.edu"
            else:
                message = "Wrong instance name entered"
                errorMessage = "Wrong instance name entered"
                # insertppreprocessed(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
                insert_into_excel_file(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
                raise Exception
            logger.info(f"input url: {input_url}")
            browser.find_element(By.XPATH, '//*[@id="url"]').send_keys(input_url)
            # time.sleep(2)
            browser.find_element(By.XPATH, '//*[@id="navbar-view-section"]/div/div/div[2]/form/div[2]/button[1]').click()
            logger.info("redirect success")
            # time.sleep(2)
            # add executed wait here
            new_tab_handle = browser.window_handles[-1]  # Get the handle of the new tab
            browser.switch_to.window(new_tab_handle)
            # time.sleep(1)
            # Now you're operating in the context of the new tab
            # You can perform actions or assertions on the new tab's content
            new_tab_url = browser.current_url
            # logger.info("URL of the new tab:", new_tab_url)
            # time.sleep(2)
            socketio.emit('preProcessor', 4.0)
            browser.find_element(By.XPATH, '//*[@id="username"]').send_keys(issm_username)
            browser.find_element(By.XPATH, '//*[@id="password"]').send_keys(issm_password)
            # log_message(f"Process started for student with ID {std.CampusID} and name {std.GivenName}.")
            browser.find_element(By.ID, 'login-button').click()
            socketio.emit('preProcessor', 5.0)
            # time.sleep(2)
            # text_login = ""
            try:
                login_failed = browser.find_element(By.CLASS_NAME, 'esg-alert__message')
                error_message = login_failed.text
                logger.error(error_message)
                errorMessage = "Invalid ISSM username or password"
                # insertppreprocessed(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
                insert_into_excel_file(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
                browser.quit()
                return False, errorMessage
                # print(text_login)
            except NoSuchElementException:
                logger.info(f"login success")
            # driver = webdriver.Chrome()  # You may need to specify the path to the chromedriver executable
            # driver.get(new_tab_url)
                status, message = testing_main(new_tab_url, browser, excel_file, socketio)
        browser.quit()  # irrespective of success or failure we are quitting the driver
        logger.info("new tab successfully redirected")
    except Exception as e:
        errorMessage = f"exception in test_wvpn.py file vpn_function"
        print(f"{errorMessage}, {e}")
        # insertppreprocessed(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
        insert_into_excel_file(userName, logResponse, institutionId, sessionResult, errorMessage, backendProcessor)
    logger.info(f"Logout success and driver quit and status: {status}, message: {message}")
    # Close the WebDriver when done
    # browser.quit()
    return status, message
