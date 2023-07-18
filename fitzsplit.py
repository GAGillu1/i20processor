import fitz
import pandas as pd

import issm_log
from dbstatements import selectsignature

import os
cwd=os.getcwd()
def sign_details(name):

    #df = pd.read_excel('signature.xlsx')
    df=selectsignature()

    row = df.loc[df['fullName'] == name]

    if len(row) == 0:
        raise ValueError(f"No signature details found for name '{name}'")

    length = row['signatureLength'].values[0]
    width = row['signatureWidth'].values[0]
    xcoordinate = row['signatureXCordinate'].values[0]
    ycoordinate = row['signatureYCordinate'].values[0]

    return length, width, xcoordinate, ycoordinate
"""Split signature """
def splitsignature(pdf_path, signature_path,length,width,xco,yco):
            with fitz.open(pdf_path)as doc:
                #doc = fitz.open(pdf_path)
                #getting total number of pages form the pdf
                total_pages = doc.page_count
                pages_per_file = 3
                #empty list to add all sevis id's
                d=[]
                #initiating count and incrementing it in loop so we get total number of signs added
                count=0
                #opening signature image
                signature_image = fitz.Pixmap(signature_path)
                signature_image.dpi = (50, 50)
                for i in range(total_pages):
                    if i % 3 == 0:
                        with fitz.open() as out_doc:
                            user_signatures = {
                                "elisa": {"size": (length, width), "position": (xco, yco)}}
                            # Add the specified number of pages to the output document
                            for j in range(i, min(i + pages_per_file, total_pages)):
                                out_doc.insert_pdf(doc, from_page=j, to_page=j)
                             #load first page  and add signature
                            first_page = out_doc.load_page(0)
                            page_text = first_page.get_text()
                            sevis_id = ""
                            for line in page_text.split("\n"):
                                if "SEVIS ID" in line:
                                    sevis_id = line.split(":")[1].strip()
                                    d.append(sevis_id)
                                    break
                            # user_signature = user_signatures["elisa"]
                            # y = (792 - user_signature["position"][1] - user_signature['size'][1])
                            # z = y + user_signature['size'][1]
                            # sig_rect = fitz.Rect(user_signature["position"][0], y, user_signature['position'][0] + user_signature['size'][0], z)
                            # first_page.insert_image(sig_rect, pixmap=signature_image)
                            out_doc.save(sevis_id+".pdf")
                            print(cwd+sevis_id)
                            count=count+1

            print("Count is in split file  ",count)
            return d, total_pages, count




#sevid,totalpages,totalsigns=splitsignature('i20.pdf', 'klopez.png', 152, 50, 90, 190)
# print(sevid,totalpages,totalsigns)

