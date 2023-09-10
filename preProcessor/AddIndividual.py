import time
from selenium.webdriver.common.by import *
from selenium.webdriver.support.ui import *
import configparser
from selenium.common.exceptions import NoSuchElementException
from preProcessor.issmfilelog import logger
from selenium.webdriver.support import expected_conditions as ec

def AddIndividual(student, driver, check_val):
    config = configparser.ConfigParser()
    config.read('config.ini')
    try:
        # print("start of AddIndividual")
        wait = WebDriverWait(driver, 10)  # 10 seconds timeout
        #  print(student)
        #  template_url = domain_url + '/WizardPickTemplate.aspx?SysId=56527&Mode=F'
        # driver.get(domain_url + '/AddNewIndividual.aspx')
        # Find the username and password input fields using XPath
        if check_val:
            element = wait.until(
                ec.visibility_of_element_located(
                    (By.XPATH, config['ID_XPATH']['last_name'])))
            element.send_keys(student.Surname)
            # driver.find_element(By.XPATH, config['ID_XPATH']['last_name']).send_keys(student.Surname)
            # print("last name filled")
            driver.find_element(By.XPATH, config['ID_XPATH']['first_name']).send_keys(student.GivenName)
            # print("first name filled")
            driver.find_element(By.XPATH, config['ID_XPATH']['birth_date']).send_keys(student.Birthdate)
            # print("birthdate filled")
            driver.find_element(By.XPATH, config['ID_XPATH']['admissions_id']).send_keys(student.AdmissionsID)
            # print("admission id filled")
            driver.find_element(By.XPATH, config['ID_XPATH']['campus_id']).send_keys(student.CampusID)
            # print("campus id filled")
            Select(driver.find_element(By.ID, config['ID_XPATH']['department_id'])).select_by_visible_text(student.Department)
            # print("department id filled")
            driver.find_element(By.ID, config['ID_XPATH']['continue_btn']).click()

        try:
            time.sleep(2)
            driver.find_element(By.ID, config['ID_XPATH']['ignore_and_add']).click()
            # check_val = True
            # print(f"duplicate caught duplicate_check function for {student.CampusID}")
            # raise Exception
            # # Perform actions with the error element (if needed)
        except NoSuchElementException:
            # print(f"no exceptions caught duplicate_check function for {student.CampusID}")
            # check_val = False
            pass

        #  ----------------Choose Template ---------------------------#
        #  need to modify the below code according to config.ini parameters
        time.sleep(2)
        Select(driver.find_element(By.ID, config['ID_XPATH']['select_template'])).select_by_visible_text(student.Template)
        # print("template filled")
        driver.find_element(By.ID, config['ID_XPATH']['continue_btn']).click()
        # ----------------Fill F/M Information---------------------------#
        #  https://issm-test.newhaven.edu/WizardPickTemplate.aspx?SysId=13019&Mode=F
        time.sleep(2)
        Select(driver.find_element(By.ID, config['ID_XPATH']['country_of_birth'])).select_by_visible_text(student.BirthCountry)
        # print("birth country filled")
        Select(driver.find_element(By.ID, config['ID_XPATH']['country_of_citizenship'])).select_by_visible_text(student.Citizenship)
        # print("citizenship filled")
        #  P4LevelEduDDL
        Select(driver.find_element(By.ID, config['ID_XPATH']['level_of_edu'])).select_by_visible_text(student.Level)
        # print("level of education filled")
        #  major =
        Select(driver.find_element(By.ID, config['ID_XPATH']['major_of_study'])).select_by_visible_text(student.Major)
        # print("major filled")
        #  startDate
        driver.find_element(By.XPATH, config['ID_XPATH']['course_start_date']).send_keys(student.StartDate)
        # print("course start date filled")
        #  sessionStartDate
        driver.find_element(By.XPATH, config['ID_XPATH']['initiate_start_date']).send_keys(student.SessionStartDate)
        # print("initial state date filled")
        #  endDate
        driver.find_element(By.XPATH, config['ID_XPATH']['course_end_date']).send_keys(student.EndDate)
        # print("end date filled")
        #  academicTerm
        Select(driver.find_element(By.ID, config['ID_XPATH']['academic_term'])).select_by_visible_text(str(student.AcademicTerm))
        # logger.info("academic term filled")
        #  tuitionAndFees
        driver.find_element(By.XPATH, config['ID_XPATH']['tuition_expenses']).send_keys(student.Tuition)
        # print("tuition filled")
        #  livingExpenses
        driver.find_element(By.XPATH, config['ID_XPATH']['living_expenses']).send_keys(student.LivingExpenses)
        # print("living expenses filled")
        #  otherDesc
        driver.find_element(By.XPATH, config['ID_XPATH']['oth_expense_type']).send_keys(student.OtherDesc)
        # print("oth expenses type filled")
        #  otherValue
        driver.find_element(By.XPATH, config['ID_XPATH']['other_expense']).send_keys(student.OtherAmount)
        # print("other expense filled")
        driver.find_element(By.XPATH, config['ID_XPATH']['personal_funds']).send_keys(student.PersonalFunds)
        # print("personal funds filled")
        driver.find_element(By.XPATH, config['ID_XPATH']['school_funds']).send_keys(student.SchoolFunds)
        # print("school funds filled")
        driver.find_element(By.XPATH, config['ID_XPATH']['school_funds_desc']).send_keys(student.SchoolFundsDesc)
        # print("school funds desc filled")
        driver.find_element(By.XPATH, config['ID_XPATH']['other_funds']).send_keys(student.FundsFromAnother)
        # print("other funds filled")
        driver.find_element(By.XPATH, config['ID_XPATH']['other_funds_desc']).send_keys(student.FundsFromAnotherDesc)
        # print("other funds desc filled")
        driver.find_element(By.XPATH, config['ID_XPATH']['remarks']).send_keys(student.Remarks)
        #  Click Continue
        # print("remarks filled")
        driver.find_element(By.ID, config['ID_XPATH']['continue_btn']).click()
        #  can reference same continue button as id is same
        # ----------------Fill Additional Information---------------------------#
        #  gender
        time.sleep(2)
        Select(driver.find_element(By.ID, config['ID_XPATH']['gender'])).select_by_visible_text(student.Gender)
        #  Click Add Permanent Address
        # print("gender filled")
        driver.find_element(By.ID, config['ID_XPATH']['add_permanent_addr']).click()
        # ----------------Fill Add/Edit Address Information---------------------------#
        # print("add_permanent_addr")
        element = wait.until(
            ec.visibility_of_element_located(
                (By.XPATH, config['ID_XPATH']['address_one'])))
        element.send_keys(student.PermLine1)
        # driver.find_element(By.XPATH, config['ID_XPATH']['address_one']).send_keys(student.PermLine1)
        # print("address_one")
        driver.find_element(By.XPATH, config['ID_XPATH']['address_two']).send_keys(student.PermLine2)
        # print("address_two")
        driver.find_element(By.XPATH, config['ID_XPATH']['address_city']).send_keys(student.PermCity)
        # print("address_city")
        driver.find_element(By.XPATH, config['ID_XPATH']['address_province']).send_keys(student.PermProvince)
        # print("address_province")
        driver.find_element(By.XPATH, config['ID_XPATH']['address_zip_code']).send_keys(student.PermPostal)
        # print("address_zip_code")
        Select(driver.find_element(By.ID, config['ID_XPATH']['address_country'])).select_by_visible_text(student.PermCountry)
        # print("address_country")
        driver.find_element(By.XPATH, config['ID_XPATH']['phone_number']).send_keys(student.Phone)
        #  Click Save Permanent Address
        driver.find_element(By.ID, config['ID_XPATH']['submit_btn']).click()
        #  Click Add Email Address
        element = wait.until(
            ec.visibility_of_element_located(
                (By.ID, config['ID_XPATH']['add_email_btn'])))
        element.click()
        # driver.find_element(By.ID, config['ID_XPATH']['add_email_btn']).click()

        # ----------------Back to Fill Add/Edit Email Address Information---------------------------#

        # ----------------Fill Add/Edit Email Address Information---------------------------#
        driver.find_element(By.XPATH, config['ID_XPATH']['email_id']).send_keys(student.Email)
        #  Click Save Email  Address
        driver.find_element(By.ID, config['ID_XPATH']['submit_btn']).click()
        # ----------------Back to Fill Add/Edit Email Address Information---------------------------#
        #  Click Continue
        element = wait.until(
            ec.visibility_of_element_located(
                (By.ID, config['ID_XPATH']['continue_btn'])))
        element.click()
        # driver.find_element(By.ID, config['ID_XPATH']['continue_btn']).click()
        #  can reference same continue button as id is same
        element = wait.until(ec.visibility_of_element_located((By.ID, config['ID_XPATH']['hyperlink_click'])))
        href = element.get_attribute('href')
        # Navigate to the URL
        driver.get(href)
        # driver.get(driver.find_element(By.ID, config['ID_XPATH']['hyperlink_click']).get_attribute('href'))
        driver.find_element(By.XPATH, config['ID_XPATH']['phone_country_code']).send_keys(student.phone_code)
        driver.find_element(By.ID, config['ID_XPATH']['edit_save_btn']).click()
        time.sleep(1)
        final_status = wait.until(
            ec.visibility_of_element_located(
                (By.XPATH, config['ID_XPATH']['status_checker'])))
        # final_status = driver.find_element(By.XPATH, config['ID_XPATH']['status_checker'])
        logger.info(f"final status: {final_status.text}")
        if final_status.text == "Complete":
            logger.info(f"inside final status : {final_status.text}")
            return True
        else:
            logger.error(f"inside final status : {final_status.text}")
            return False
    except Exception as e:
        logger.error(f"failed inside AddIndividual function of AddIndividual.py {e}")
        return False
