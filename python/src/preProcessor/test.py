from selenium import webdriver
from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.options import Options
import time
# from Testing import testing_main
# from TestingSingle import testing_main
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from testBulk import bulk_initiation
def vpn_function():
    # url = ""
    login_url = "https://sslvpn.newhaven.edu/remote/login?&lang=en"
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--headless")
    # chrome_options.add_argument("--disable-gpu")
    browser = webdriver.Chrome(options=chrome_options)
    # browser = webdriver.Chrome()
    # driver = webdriver.Chrome()  # You may need to specify the path to the chromedriver executable
    browser.get(login_url)
    time.sleep(1)
    browser.find_element(By.XPATH, '//*[@id="username"]').send_keys('schinnam')
    time.sleep(1)
    browser.find_element(By.XPATH, '//*[@id="credential"]').send_keys('Jonathan44..')
    time.sleep(1)
    browser.find_element(By.ID, 'login_button').click()
    print("VPN login success")
    #  add quick connection button  --  added
    # time.sleep(15)
    wait = WebDriverWait(browser, 10)  # 10 seconds timeout
    element = wait.until(
        ec.visibility_of_element_located((By.XPATH, '//*[@id="navbar-view-section"]/div/div/div[2]/div[2]/button[1]')))
    # Click the element
    element.click()

    time.sleep(2)
    browser.find_element(By.XPATH, '//*[@id="url"]').send_keys('issm-test.newhaven.edu')
    time.sleep(2)
    browser.find_element(By.XPATH, '//*[@id="navbar-view-section"]/div/div/div[2]/form/div[2]/button[1]').click()
    print("redirect success")
    time.sleep(2)
    new_tab_handle = browser.window_handles[-1]  # Get the handle of the new tab
    browser.switch_to.window(new_tab_handle)
    time.sleep(1)
    # Now you're operating in the context of the new tab
    # You can perform actions or assertions on the new tab's content
    new_tab_url = browser.current_url
    print("URL of the new tab:", new_tab_url)
    # second_http_index = new_tab_url.find("http", new_tab_url.find("http") + 1)
    # print("fetched url")
    # if second_http_index != -1:
    #     url = new_tab_url[:second_http_index]
    #     print(url)
    # else:
    #     print("Second 'http' not found in the URL.")
    # time.sleep(1)
    # all_cookies = browser.get_cookies()
    # print(all_cookies)
    # browser.get(new_tab_url)
    print("before bulk_initiation function call")
    try:
        # chrome_options = webdriver.ChromeOptions()
        # chrome_options.add_argument("--no-sandbox")
        # chrome_options.add_argument("--headless")
        # chrome_options.add_argument("--disable-gpu")
        # driver = webdriver.Chrome(options=chrome_options)
        # # time.sleep(1)
        # # driver.switch_to.window(new_tab_handle)
        # driver.get(new_tab_url)
        # print("after redirect to new handle")
        # time.sleep(2)
        # browser.find_element(By.XPATH, '//*[@id="username"]').send_keys('gasbodd13')
        # browser.find_element(By.XPATH, '//*[@id="password"]').send_keys('Boddupalli#13')
        # # log_message(f"Process started for student with ID {std.CampusID} and name {std.GivenName}.")
        # browser.find_element(By.ID, 'login-button').click()
        # print(f"login success")
        # driver = webdriver.Chrome()  # You may need to specify the path to the chromedriver executable
        # driver.get(new_tab_url)
        # print(f"url before bulk initiation {new_tab_url}")
        status = bulk_initiation(new_tab_url)
        if status:
            print("success from bulk_initiation")
        else:
            print("bulk_initiation failed")
        print("new tab successfully redirected")
    except Exception as e:
        print(e)
    print("after bulk_initiation function call")

    # time.sleep(1)

    # driver.find_element(By.XPATH, '//*[@id="username"]').send_keys('gasbodd13')
    # driver.find_element(By.XPATH, '//*[@id="password"]').send_keys('Boddupalli#13')
    # driver.find_element(By.ID, 'login-button').click()
    # When done, you can switch back to the original tab if needed
    print("before switch back to vpn page")
    original_tab_handle = browser.window_handles[0]
    browser.switch_to.window(original_tab_handle)
    time.sleep(1)
    #  browser.find_element(By.XPATH, '/html/body/div[3]/div').click()
    print("Logout success and driver quit")
    # Close the WebDriver when done
    browser.quit()

if __name__ == "__main__":
    vpn_function()  # calling the main function with the specified input files
