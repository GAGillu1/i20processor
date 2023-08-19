import asyncio

import pandas as pd
import fitz

import issm_log
from name import signaturefile

""" below function is to get the coordinates of signature with the given name """
def sign_details(name):
    df = pd.read_excel('signature.xlsx')
    row = df.loc[df['Full Name'] == name]
# if signature is not found then returns no signature details found
    if len(row) == 0:
        raise ValueError(f"No signature details found for name '{name}'")
#coordinates from the given name row
    length = row['signaturelength'].values[0]
    width = row['signaturewidth'].values[0]
    xcoordinate = row['signaturexcoordinate'].values[0]
    ycoordinate = row['signatureycoordinate'].values[0]

    return length, width, xcoordinate, ycoordinate

"""Defnition to add signature to the file """
def add_signature(pdf_path, signature_path, output_path,length,width,xco,yco):

    doc = fitz.open(pdf_path)
    num_pages = doc.page_count
    output_pdf=fitz.open()
    #Dictionary like thing to get coordinates
    user_signatures = {
        "elisa": {"size": (length, width), "position": (xco, yco)}}
    #load first page
    first_page = doc[0]
    # from the above dict take all cordinated
    user_signature = user_signatures["elisa"]
    # we are subtracting from 792 as the page has 792 height
    y = (792 - user_signature["position"][1] - user_signature['size'][1])
    z = y + user_signature['size'][1]
    sig_rect = fitz.Rect(user_signature["position"][0], y, user_signature['position'][0] + user_signature['size'][0], z)
    signature_image = fitz.Pixmap(signature_path)
    # inserting image at those coordinates
    first_page.insert_image(sig_rect, pixmap=signature_image)
    output_pdf.insert_pdf(doc, from_page=0, to_page=0)
    # Add remaining pages without signature
    for page_num in range(1, num_pages):
        page = doc[page_num]
        output_pdf.insert_pdf(doc, from_page=page_num, to_page=page_num)

    print("addsign",output_path)
    output_pdf.save(output_path)
    return output_pdf

"""Addubg sugnature to the pdf file """

def add_signature1(pdf_path, signature_path, output_path, length, width, xco, yco):
    print(signature_path)
    issm_log.logger.info(f"Adding Signature to file {pdf_path} with signature {signature_path}")
    doc = fitz.open(pdf_path)
    num_pages = doc.page_count
    output_pdf = fitz.open()
    print("ininijninn")

    user_signatures = {"elisa": {"size": (length, width), "position": (xco, yco)}}
    user_signature = user_signatures["elisa"]
    # 792 is total height and subtracting from it to get the Y coordinate
    y = (792 - user_signature["position"][1] - user_signature['size'][1])
    z = y + user_signature['size'][1]
    sig_rect = fitz.Rect(user_signature["position"][0], y, user_signature['position'][0] + user_signature['size'][0], z)
    signature_image = fitz.Pixmap(signature_path)

    # Add signature to all the first pages in pdf
    for page_num in range(num_pages):
        if (page_num % 3 == 0):
            page = doc[page_num]
            #inserting image
            page.insert_image(sig_rect, pixmap=signature_image)

        output_pdf.insert_pdf(doc, from_page=page_num, to_page=page_num)
    print(output_path)
    output_pdf.save(output_path)
    issm_log.logger.info(f"Output file saved ,{output_path}")
    return output_path



# pdf_filename='i20.pdf'
# length, width, xco, yco = sign_details('Elisa Medina')
# signature_file = signaturefile('Elisa Medina')
# output_file=pdf_filename.split(".pdf")[0]+"_signed"+".pdf"
# add_signature1(pdf_filename, signature_file, output_file, length, width, xco, yco)
