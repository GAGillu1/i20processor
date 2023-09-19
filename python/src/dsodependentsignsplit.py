
from io import StringIO
import PyPDF2
import pdfminer.high_level
from pdfminer.high_level import extract_text
from pdfminer.layout import LAParams
import fitz
import datetime
today = datetime.datetime.today()
date = today.strftime('%Y%m%d')


def depsignature(doc,signaturepath,length,width,xco,yco):
    print(signaturepath,length,width,xco,yco)
    signature_path = signaturepath  # Replace with the actual path to your signature image
    first_page = doc[0]
    user_signatures = {"elisa": {"size": (length, width), "position": (xco, yco)}}
    user_signature = user_signatures["elisa"]
    y = (792 - user_signature["position"][1] - user_signature['size'][1])
    z = y + user_signature['size'][1]
    sig_rect = fitz.Rect(user_signature["position"][0], y, user_signature['position'][0] + user_signature['size'][0], z)
    print(sig_rect)
    signature_image = fitz.Pixmap(signature_path)
    first_page.insert_image(sig_rect, pixmap=signature_image)


def depi20signature(pdf,signature_path,length, width, xco, yco):
    d=[]
    g = {}
    f=[]
    seevis_ids=[]

    with fitz.open(pdf) as doc:
        total_pages = doc.page_count
        for i in range(total_pages):
                pages=doc.load_page(i)
                page_text = pages.get_text()
                lines=page_text.split("\n")
                for line in lines:
                      if 'THIS PAGE INTENTIONALLY LEFT BLANK' in line:
                          d.append(i+1)

        print(d)
        key = 0
        prev_page = None
        for page in d:
            if prev_page is None or page != prev_page + 4:
                g[key] = (page,)  # Create a new key-value pair with the current page number
                key += 1
            else:
                g[key] = g.get(key, ()) + (page,)  # Append the current page number to the existing key
            prev_page = page
        print(g)
        original_doc = fitz.open(pdf)
        #g=updated_dict
        print("g is ",g)
        removepage = fitz.open()
        #print("kehafuhafh",len(g[0]))
        for key, values in g.items():
            print("values",values)
            print(len(values))
            print(values[0])
            for value in values:
                start=value
                remove_pages=list(range(start-4,start))
                print(start-4,start)
                removed_doc = fitz.open()
                for j in remove_pages:
                    # get the page from the original document and insert it into the removed document
                    print("j is ",j)
                    removed_doc.insert_pdf(original_doc, from_page=j, to_page=j)
                    f.append(j)
            # remove the pages from the original document
                first_page = removed_doc.load_page(0)
                page_text = first_page.get_text()
                F2 = False
                for line in page_text.split("\n"):
                    if "SEVIS ID" in line:
                        sevis_id = line.split(":")[1].strip()
                        print(line)
                        print(sevis_id)
                        seevis_ids.append(sevis_id)
                        msg="F1"
                        break
                for line in page_text.split("\n"):
                    if "STUDENT'S SEVIS ID:" in line:
                        F2 = True
                        break
                print(j)
                print("Removed",sevis_id)
                print("afafaf",original_doc.page_count)
            #original_doc.delete_pages(remove_pages)
            # save the removed and original documents
            #print(removed_doc.page_count)
                print(msg,sevis_id)
                if removed_doc.page_count  and F2:
                    print("Saved F2")
                    depsignature(removed_doc,signature_path,length,width,xco,yco)
                    removed_doc.save('F2-' + sevis_id + '.pdf')

                elif  removed_doc.page_count :
                    depsignature(removed_doc, signature_path, length, width, xco, yco)
                    removed_doc.save(sevis_id + '.pdf')
        filename=f'original{date}'+'.pdf'
        print("f is ",f)
        original_doc.delete_pages(f)
        if original_doc.page_count != 0:
            original_doc.save(filename)
        with fitz.open(filename) as splitdoc:
            total_pages = splitdoc.page_count
            pages_per_file = 3
            g=[]

            for i in range(total_pages):
                if i % 3 == 0:
                    with fitz.open() as out_doc:
                        for j in range(i, min(i + pages_per_file, total_pages)):
                            out_doc.insert_pdf(splitdoc, from_page=j, to_page=j)

                        first_page = out_doc.load_page(0)
                        page_text = first_page.get_text()
                        sevis_id = ""
                        F2= False
                        for line in page_text.split("\n"):
                            if "SEVIS ID" in line:
                                sevis_id = line.split(":")[1].strip()
                                seevis_ids.append(sevis_id)
                                g.append(sevis_id)
                                msg='F1'
                                print(msg,sevis_id)
                                print(line)
                                break

                        for line in page_text.split("\n"):
                            if "STUDENT'S SEVIS ID:" in line:
                                F2 = True
                                break

                        if out_doc.page_count and F2:
                            print("saved F2")
                            depsignature(out_doc, signature_path, length, width, xco, yco)

                            out_doc.save('F2-' + sevis_id + ".pdf")
                        elif out_doc.page_count:
                            depsignature(out_doc, signature_path, length, width, xco, yco)
                            print("saved F1")
                            out_doc.save(sevis_id + ".pdf")


    return len(seevis_ids)


