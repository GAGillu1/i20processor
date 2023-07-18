import smtplib
import configparser
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def get_credentials(item):
    parse = configparser.ConfigParser()
    parse.read('config_email.ini')
    sender = parse[item]['sender']
    password = parse[item]['password']
    print(sender)
    return sender,password
#send_email(sender, password, recipients, subject, username,pwd)
def get_emails(item):
    parse = configparser.ConfigParser()
    parse.read('config_email.ini')
    emails = parse[item]['email'].split(',')
    cc = parse[item]['cc'].split(',')

    return emails, cc


def send_email(sender, password, recipients,username,pwd):
    # create SMTP connection
    smtp_server = "smtp.office365.com"
    smtp_port = 587  # or 465 for SSL
    smtp_conn = smtplib.SMTP(smtp_server, smtp_port)
    smtp_conn.ehlo()
    smtp_conn.starttls()
    smtp_conn.ehlo()
    smtp_conn.login(sender, password)
    #cc = ["gillu1@unhnewhaven.edu"]
    #bcc = ["illurugovardhanreddy@gmail.com","gillu1@unhnewhaven.edu"]
    subject = 'Password Change ISSM to Slate '
    print("recceipents are ",recipients)

    # create email message
    headers = [
        "From: " + sender,
        "To: " + ",".join(recipients),
        # "Cc: " + ",".join(cc),
        # "Bcc: " + ", ".join(bcc),
        "Subject: " + subject,
        "MIME-Version: 1.0",
        "Content-Type: text/plain",
    ]

    main_body = " Hi " + username + "," + "\n\nYour password is changed to " + pwd + "" \
                                                                                     "\n\nDo not reply to this email this is not a monitored email box\nAdmin\nISSM to Slate "
    print(main_body)
    msg = "\r\n".join(headers) + "\r\n\r\n" + main_body
    # send email
    smtp_conn.sendmail(sender, recipients, msg)
    # close SMTP connection
    smtp_conn.quit()
    print("email sent successfully")


def send_email1(sender, password, recipients,i20,inputpdf,tablehtml,cc):
    # create SMTP connection
    smtp_server = "smtp.office365.com"
    smtp_port = 587  # or 465 for SSL
    smtp_conn = smtplib.SMTP(smtp_server, smtp_port)
    smtp_conn.ehlo()
    smtp_conn.starttls()
    smtp_conn.ehlo()
    smtp_conn.login(sender, password)
    #cc = ["gillu1@unhnewhaven.edu"]
    #bcc = ["illurugovardhanreddy@gmail.com","gillu1@unhnewhaven.edu"]
    subject = 'Record Missing in Index file  '
    print("recceipents are ",recipients)
    rec=",".join(recipients)
    print(rec)
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = ",".join(recipients)
    msg['Subject'] = subject
    msg['Cc'] =",".join(cc)
    print(subject)

    main_body = "<html><body><p>Hi All,</p>" \
                "<p>I-20 not in index file is {} for the i20 file {}.</p>" \
                "<p></p>" \
                "<p></p>".format(i20, inputpdf)

    # add dataframe to main body as HTML table
    main_body += "<p>Here is the missing record:</p>"
    main_body += tablehtml

    main_body += "<p>Do not reply to this email; this is not a monitored email box</p>" \
                 "<p>Admin</p>" \
                 "<p>ISSM to Slate</p></body></html>"


    msg.attach(MIMEText(main_body, 'html'))
    rcpt = recipients.copy()
    rcpt.extend(cc)

    # close SMTP connection
    smtp_conn.sendmail(sender, rcpt, msg.as_string())

    smtp_conn.quit()
    print("email sent successfully")
