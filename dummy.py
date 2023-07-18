# from zipfile import ZipFile
# import os
# import datetime
#
# today = datetime.datetime.today()
# date = today.strftime('%Y%m%d')
#
# pdf_filename='i20.pdf'
#
# # zip_filename = 'signed_files.zip'
# # with ZipFile(zip_filename, 'w') as zip_file:
# #     for filename in os.listdir('.'):
# #         if filename.endswith('.pdf') and filename.startswith(
# #             "N") and filename != pdf_filename and not filename.endswith(
# #             "_unsigned.pdf") or filename == "index_" + date + ".xlsx" or filename == "index_" + date + ".txt":
# #             zip_file.write(filename)
#
# for file_name in os.listdir('.'):
#     print(os.listdir("."))
#     if file_name.endswith('.pdf') and file_name.endswith('.xlsx') or ('index_' in file_name and file_name.endswith('.txt')) and file_name != "user.xlsx"  and not file_name.startswith('signature') and not file_name.endswith('.py') and not file_name.endswith('.html'):
#         print(file_name)
#         os.remove(file_name)
# # for file_name in os.listdir('.'):
# #     if ('index' in file_name and file_name.endswith('.txt')) or ('N0' in file_name and file_name.endswith('.pdf')):
# #         print(file_name)


"""
import pandas as pd

df=pd.read_excel('user.xlsx')
print(df['username'])
g=(df['username'].str.lower().values)
e=(df['Email'].str.lower().values)
username='gav'
username=username.lower()
email='gillu1@unh.newhaven.edu'
email=email.lower()
# if email.lower() in e.values:
#     print(email)
#

# if username in g.values and email in e.values:
#     print("username already registered ")
#
# elif(username in g.values and email not in e.values):
#     print("Username already registered ")
# elif(username not in g.values and email in e.values):
#     print("Email alredy exists with username")
#
# else:
#     print("username needs to be registred")
#

# if (username, email) in zip(g, e):
#     print("Username and email combination already registered.")
# elif username in g:
#     print("Username already registered.")
# elif email in e:
#     print("Email already registered with a different username.")
# else:
#     print("Username and email combination not registered yet.")

if ((g == username) & (e == email)).any():
    print("Username and email combination already registered.")
elif (g == username).any():
    print("Username already registered.")
elif (e == email).any():
    userna=g[e==email]
    print(f"Email already registered with a different username: {', '.join(userna)}")
elif((e!=email) & (g!=username)).any():
    print("Username and email combination not registered yet.")
else:
    print("Some errors")"""



"""
@app.route('/upload2', methods=['POST', 'GET'])
def upload2():

    if request.method == 'POST':
        print("upload2")
        try:
            Total_Pages = None
            Total_Files = None
            Total_Signatures = None
            zipmsg = None
            Split_Failure = None
            indexmsg = None
            index_size = None
            missing_records = None
            index_error = None

            # issm_log.logger.log_filename=f'response_{timestamp}.log'
            # issm_log.set_new_log_file()


            pdf_file = request.files['i20File']
            issm_file = request.files['issmFile']
            slate_file = request.files['slateFile']
            pdf_filename = pdf_file.filename
            issm = issm_file.filename
            slate = slate_file.filename
            issm_file.save(issm)
            slate_file.save(slate)
            pdf_file.save(pdf_filename)
            name = request.form['name']
            slaterequest=request.form['toSlate']

            issm_log.logger.info(" Continued i20")
            issm_log.logger.info(f"Conitnues I20 Received post request with files :{pdf_filename,issm,slate}")


            num_pages = pages(pdf_filename)
            sevid=""
            try:
                length, width, xcoordinate, ycoordinate = sign_details(name)
                signature_file = signaturefile(name)
                sevid, totalpages, totalsigns = splitsignature(pdf_filename, signature_file, length, width, xcoordinate,
                                                               ycoordinate)

                # sevid, totalpagessplit = splitting(pdf_filename)
                totalpagessplit = totalpages / 3
                numberoffiles = totalpagessplit
                session['Total_Pages'] = f"{num_pages}"
                session['Total_Files'] = f"{int(numberoffiles)}"
                session['Total_Signatures'] = f"{totalsigns}"
                issm_log.logger.info(f"Total Pages in i20: {num_pages}. Total Files after splitting: {int(numberoffiles)} Total signatures added are {totalsigns}")
            except Exception as e:
                session['Split_Failure']=f"Splitting of file is failed {e}"
                issm_log.logger.error(f"Splitting of file is failed {e}")
            try:
                result = indexFile1(sevid, issm, slate)
                if isinstance(result, tuple):
                    sizeOfIndexfile, missing=result
                    issm_log.logger.info(f"Index file created successfully and size is {sizeOfIndexfile}")
                    session["index_size"] = f"{sizeOfIndexfile}"
                    session["missing_records"] = f"{missing}"
                    print("Size of index file is ", sizeOfIndexfile)
            except Exception as e:
                msg = result
                session["index_error"]=f"Index file creation failed {msg}"
                issm_log.logger.error(f"Index file creation failed {e}")

            try:
                zip_filename = 'signed_files.zip'
                with ZipFile(zip_filename, 'w') as zip_file:
                    for filename in os.listdir('.'):
                        if filename.endswith('.pdf') and filename.startswith(
                            "N") and filename != pdf_filename and not filename.endswith(
                            "_unsigned.pdf") or filename == "index_" + date + ".xlsx" or filename == "index_" + date + ".txt":
                            zip_file.write(filename)
                response = make_response(send_file(zip_filename, as_attachment=True))
                response.headers['Content-Disposition'] = 'attachment; filename=signed_files.zip'
                response.headers['Content-Type'] = 'application/zip'
                issm_log.logger.info("Files Zipped")
                session['zipmsg'] = "Success"
                # if slaterequest=='y':
                #     stream=request.form['program']
                #     if stream=='g':
                #         output=post(zip_filename, 'GR')
                #         issm_log.logger.info(f"Response of files to slate of continued i20{output}, stream is {stream}")
                #         print(output)
                #
                #     else:
                #         output=post(zip_filename, 'UG')
                #         issm_log.logger.info(f"Response of files to slate of continued i20 {output}, stream is {stream}")
                #         print(output)

            except Exception as e:
                session['zipmsg']=f"Files Zipping failed {e}"
                issm_log.logger.error(f"Files Zipping failed {e}")

            for file_name in os.listdir('.'):
                if file_name.endswith('.pdf') or file_name.endswith(
                        '.xlsx') and file_name != "user.xlsx" and not file_name.startswith(
                        'signature') and not file_name.endswith('.py'):
                    os.remove(file_name)

            return response

        except Exception as e:
            issm_log.logger.error(f"Process failed {e}")

"""

import PyPDF2

# Open the PDF file in read-binary mode
with open('i20.pdf', 'rb') as pdf_file:
    # Create a PDF reader object
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    # Loop through each page in the PDF file
    for page_num in range(len(pdf_reader.pages)):
        # Get the current page object
        page = pdf_reader.pages[page_num]

        # Extract text from the page
        text = page.extract_text()

        # Split text into lines and loop through each line
        if page_num==0:
            for line in text.split('\n'):
                print(line)
                if line=="THIS PAGE INTENTIONALLY LEFT BLANK":
                    print("This is end of F1 and F2 is starting ")







