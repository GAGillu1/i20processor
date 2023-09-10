from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver.common.by import By
from TestingSingle import testing_main
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from issmfilelog import logger
import time
def vpn_function(vpn_username, vpn_password, issm_username, issm_password, excel_file, instance):
    status = None
    message = ""
    try:
        logger.info(f"starting vpn_function in test_wvpn file")
        login_url = "https://sslvpn.newhaven.edu/remote/login?&lang=en"
        chrome_options = webdriver.ChromeOptions()
        # chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        # chrome_options.add_argument("--disable-gpu")
        chrome_options.page_load_strategy = 'normal'
        browser = webdriver.Chrome(options=chrome_options)
        # browser = webdriver.Chrome()
        # driver = webdriver.Chrome()  # You may need to specify the path to the chromedriver executable
        browser.get(login_url)
        time.sleep(1)
        logger.info("before entering username")
        browser.find_element(By.XPATH, '//*[@id="username"]').send_keys(vpn_username)
        time.sleep(1)
        logger.info(f"before credentials")
        browser.find_element(By.XPATH, '//*[@id="credential"]').send_keys(vpn_password)
        time.sleep(1)
        browser.find_element(By.ID, 'login_button').click()
        try:
            time.sleep(1)
            vpn_login_error = browser.find_element(By.ID, 'err_val')
            logger.error(vpn_login_error.text)
            browser.quit()
            return False, vpn_login_error.text + " VPN username or password error"
        except NoSuchElementException:
            logger.info("VPN login success")
            #  add quick connection button  --  added
            # time.sleep(15)
            wait = WebDriverWait(browser, 10)  # 10 seconds timeout
            element = wait.until(
                ec.visibility_of_element_located((By.XPATH, '//*[@id="navbar-view-section"]/div/div/div[2]/div[2]/button[1]')))
            # Click the element
            element.click()
            input_url = ""
            # time.sleep(2)
            if instance == "Prod":
                input_url = "issm-prod.newhaven.edu"
            elif instance == "Test":
                input_url = "issm-test.newhaven.edu"
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
            browser.find_element(By.XPATH, '//*[@id="username"]').send_keys(issm_username)
            browser.find_element(By.XPATH, '//*[@id="password"]').send_keys(issm_password)
            # log_message(f"Process started for student with ID {std.CampusID} and name {std.GivenName}.")
            browser.find_element(By.ID, 'login-button').click()
            # time.sleep(2)
            # text_login = ""
            try:
                login_failed = browser.find_element(By.CLASS_NAME, 'esg-alert__message')
                logger.error(login_failed.text)
                browser.quit()
                return False, login_failed.text + " ISSM username or password error"
                # print(text_login)
            except NoSuchElementException:
                logger.info(f"login success")
            # driver = webdriver.Chrome()  # You may need to specify the path to the chromedriver executable
            # driver.get(new_tab_url)
                status, message = testing_main(new_tab_url, browser, excel_file)
        browser.quit()  # irrespective of success or failure we are quitting the driver
        logger.info("new tab successfully redirected")
    except Exception as e:
        print("exception in test_wvpn.py file vpn_function", e)
    logger.info(f"Logout success and driver quit and status: {status}, message: {message}")
    # Close the WebDriver when done
    # browser.quit()
    return status, message
