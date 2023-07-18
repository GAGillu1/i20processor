# # # import fitz
# # #
# # # pdf_file = "outputfile.pdf"
# # # doc = fitz.open(pdf_file)
# # #
# # # for page_number in range(doc.page_count):
# # #     page = doc.load_page(page_number)
# # #     page_content = page.get_text()
# # #
# # #     lines = page_content.split('\n')
# # #
# # #     for line_number, line in enumerate(lines):
# # #         print(f"Line {line_number}: {line}")
# #
# # filename="N0034107392_unsigned.pdf"
# # output_file = filename.split('_unsigned.')[0]
# # print(output_file)
#
#
# import pandas as pd
# import datetime
# #
# # today = datetime.datetime.today()
# # date = today.strftime('%Y%m%d')
# #
# # def indexFile(sevid, issm, slate):
# #     admissions_cols = ["SEVIS ID", "Admissions Id"]
# #     admissions_df = pd.read_excel(issm, usecols=admissions_cols)
# #
# #     sevis_ids = sevid
# #     applications_cols = ["Ref", "Application Slate ID"]
# #     applications_df = pd.read_excel(slate, usecols=applications_cols)
# #
# #     filtered_admissions_df = admissions_df[admissions_df["SEVIS ID"].isin(sevis_ids)]
# #     filtered_applications_df = applications_df[applications_df["Ref"].isin(filtered_admissions_df["Admissions Id"])]
# #
# #     merged_df = pd.merge(filtered_admissions_df, filtered_applications_df, left_on="Admissions Id", right_on="Ref")
# #
# #     merged_df["Application Slate ID"] = merged_df["Application Slate ID"].astype(str).str.zfill(9)
# #     merged_df["Admissions Id"] = merged_df["Admissions Id"].astype(str).str.zfill(9)
# #     merged_df["Filename"] = merged_df["SEVIS ID"] + ".pdf"
# #     merged_df["I20 Sent Date"] = date
# #     merged_df["material"] = "Sent i20"
# #     merged_df = merged_df.reset_index(drop=True)
# #
# #     merged_df.to_csv("index_" + date + ".txt", index=False)
# #     merged_df.to_excel("index_" + date + ".xlsx", index=False)
# #
# #     return merged_df
#
#
# import fitz
#
# # Define your input dictionary
# input_dict = {0: (4, 8, 11)}
#
# # Open your PDF file with PyMuPDF
# pdf_doc = fitz.open('i20.pdf')
# print(pdf_doc.page_count)
#
# # Create a new PDF document to hold the removed pages
# removed_pages_doc = fitz.open()
#
# # Keep track of the number of pages deleted so far
# num_deleted_pages = 0
#
# # Loop over each key in the input dictionary
# for key in input_dict.keys():
#     # Loop over each value in the tuple for the current key
#     for i, val in enumerate(input_dict[key]):
#         # If this isn't the last value in the tuple
#         if i < len(input_dict[key])-1:
#             # Calculate the start and end page numbers
#             start = max(val - 4 - num_deleted_pages, 0)
#             end = max(val - num_deleted_pages, 0)
#
#             print(start,end)
#             # Remove the pages from the PDF and add them to the removed pages document
#             for page in range(start, end):
#                 print("Page is",page)
#
#                 removed_page = pdf_doc.delete_page(page - num_deleted_pages)
#                 removed=pdf_doc.load_page(page - num_deleted_pages)
#                 pagetext=removed.get_text()
#                 print(f"pafk[pakifakfakf   {page}      {(page - num_deleted_pages)}",pagetext)
#
#                 if removed_page is not None:
#                     removed_pages_doc.insert_pdf(removed_page)
#
#             # Update the number of deleted pages
#             num_deleted_pages += end - start
#
#
#         else:
#             print("else")
#             # Calculate the start and end page numbers
#             start = max(val - 3 - num_deleted_pages, 0)
#             end = max(val - num_deleted_pages, 0)
#
#             print(start,end)
#             # Remove the pages from the PDF and add them to the removed pages document
#             for page in range(start, end):
#                 print("page in else",page)
#                 removed_page = pdf_doc.delete_page(page - num_deleted_pages)
#                 print("page aaaa",page)
#                 if removed_page is not None:
#                     removed_pages_doc.insert_pdf(removed_page)
#
#             # Update the number of deleted pages
#             num_deleted_pages += end - start
#
# # Save the modified PDF and the removed pages document
# if pdf_doc.page_count!=0:
#     pdf_doc.save('output_file.pdf')
# if removed_pages_doc.page_count!=0:
#     for i in range(removed_pages_doc.page_count):
#         removed_pages_doc.select([i])
#         removed_pages_doc.save(f'removed_page_{i+1}.pdf')
#
# )
# from addSignature import add_signature1
# import os
# cwd=os.getcwd()
# print(cwd)
# print(cwd+'\\Test_sign')
# def addsign(user):
#     print(user)
#     sign='test'
#     png_file='emedina.png'
#     output_file='i20.pdf'
#     pdf_filename=r'C:\Users\91979\PycharmProjects\IsmmToSlate\Test_sign\i20.pdf'
#     length = 170
#     width = 60
#     xco = 75
#     yco = 172
#     if sign=='test':
#         """Test signature but dont add"""
#         add_signature1(pdf_filename, png_file, output_file, length, width, xco, yco)
#         # response=make_response(send_file(output_file, as_attachment=True))
#         # return response
#
#     elif sign =='upload':
#         """Add signature to excel file """
#         add_signature1(pdf_filename, png_file, output_file, length, width, xco, yco)
#         # response = make_response(send_file(output_file, as_attachment=True))
#         # msg=signadd(fullname,email,username)
#         # return msg
#
# addsign('GOV')


from cryptography.fernet import Fernet

def encrypt(password):
    key = Fernet.generate_key()
    fernet = Fernet(key)
    encrypted_password = fernet.encrypt(password.encode())
    return key, encrypted_password

password = "secret"
key, encrypted_password = encrypt(password)

# print the key and encrypted password
print("Key:", key)
print("Encrypted password:", encrypted_password)
