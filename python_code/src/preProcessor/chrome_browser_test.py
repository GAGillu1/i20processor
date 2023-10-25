from selenium import webdriver

try:
    # chrome_options = webdriver.ChromeOptions()
    # chrome_options.add_argument("--no-sandbox")
    # chrome_options.add_argument("--headless")
    # chrome_options.add_argument("--disable-dev-shm-usage")
    # # chrome_options.binary_location = '/usr/bin/google-chrome'
    # chrome_options.page_load_strategy = 'normal'
    print("before start of webdriver")
    # browser = webdriver.Chrome(service=service, options=chrome_options)
    # commented the below line for amazon instance.
    browser = webdriver.Chrome()
    print("before get")
    browser.get("https://www.google.com")
    print("after get")
    # print(browser.page_source)
    print(browser.current_url)
    browser.quit()
except Exception as e:
    print(e)