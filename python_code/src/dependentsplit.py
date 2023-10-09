import fitz
import datetime
from collections import defaultdict
today = datetime.datetime.today()
date = today.strftime('%Y%m%d')

# def depi20(pdf):
#     d=[]
#     g = {}
#     f=[]
#     seevis_ids=[]
#
#     with fitz.open(pdf) as doc:
#         total_pages = doc.page_count
#         for i in range(total_pages):
#                 pages=doc.load_page(i)
#                 page_text = pages.get_text()
#                 lines=page_text.split("\n")
#                 for line in lines:
#                     # if "SEVIS ID" in line:
#                     #     key_value_pairs = line.split(':')
#                     #     if key_value_pairs[0].strip() == 'SEVIS ID':
#                     #         sevis_id = key_value_pairs[1].strip()
#                     #         d.append(sevis_id)
#                       if 'THIS PAGE INTENTIONALLY LEFT BLANK' in line:
#                           d.append(i+1)
#                         # sevisid=line.split(":")[1].strip()
#                         # print(line)
#                         # d.append(sevisid)
#         print(d)
#         key = 0
#         prev_page = None
#         for page in d:
#             if prev_page is None or page - prev_page > 3:
#                 key += 1
#             g.setdefault(key, []).append(page)
#             prev_page = page
#
#         print(g)
#         original_doc = fitz.open(pdf)
#
#         #g=updated_dict
#         print("g is ",g)
#         for key, values in g.items():
#             print("values",values)
#             print(len(values))
#             print(values[0])
#             for value in values:
#                 start=value
#                 remove_pages=list(range(start-4,start))
#                 print(start-4,start)
#                 removed_doc = fitz.open()
#                 for j in remove_pages:
#                     # get the page from the original document and insert it into the removed document
#                     print("j is ",j)
#                     removed_doc.insert_pdf(original_doc, from_page=j, to_page=j)
#                     f.append(j)
#             # remove the pages from the original document
#                 first_page = removed_doc.load_page(0)
#                 page_text = first_page.get_text()
#                 F2 = False
#                 for line in page_text.split("\n"):
#                     if "SEVIS ID" in line:
#                         sevis_id = line.split(":")[1].strip()
#                         print(line)
#                         print(sevis_id)
#                         seevis_ids.append(sevis_id)
#                         msg="F1"
#                         break
#                 for line in page_text.split("\n"):
#                     if "STUDENT'S SEVIS ID:" in line:
#                         F2 = True
#                         break
#                 print(j)
#                 print("Removed",sevis_id)
#                 print("afafaf",original_doc.page_count)
#             #original_doc.delete_pages(remove_pages)
#             # save the removed and original documents
#             #print(removed_doc.page_count)
#                 print(msg,sevis_id)
#                 if removed_doc.page_count  and F2:
#                     removed_doc.save('F2-' + sevis_id + '.pdf')
#
#                 elif  removed_doc.page_count :
#                     removed_doc.save(sevis_id + '.pdf')
#
#
#
#         filename=f'original{date}'+'.pdf'
#         print("f is ",f)
#         original_doc.delete_pages(f)
#         print("originifoajfoa",original_doc.page_count)
#         if original_doc.page_count != 0:
#             original_doc.save(filename)
#         with fitz.open(filename) as splitdoc:
#             total_pages = splitdoc.page_count
#             pages_per_file = 3
#             g=[]
#
#             for i in range(total_pages):
#                 if i % 3 == 0:
#                     with fitz.open() as out_doc:
#                         for j in range(i, min(i + pages_per_file, total_pages)):
#                             out_doc.insert_pdf(splitdoc, from_page=j, to_page=j)
#
#                         first_page = out_doc.load_page(0)
#                         page_text = first_page.get_text()
#                         sevis_id = ""
#                         F2= False
#                         for line in page_text.split("\n"):
#                             if "SEVIS ID" in line:
#                                 sevis_id = line.split(":")[1].strip()
#                                 seevis_ids.append(sevis_id)
#                                 g.append(sevis_id)
#                                 msg='F1'
#                                 print(msg,sevis_id)
#                                 print(line)
#                                 break
#
#                         for line in page_text.split("\n"):
#                             if "STUDENT'S SEVIS ID:" in line:
#                                 F2 = True
#                                 break
#
#                         if out_doc.page_count and F2:
#                             print("saved F2 ",sevis_id)
#                             out_doc.save('F2-' + sevis_id + ".pdf")
#                         elif out_doc.page_count:
#                             print("saved F1 ",sevis_id)
#                             out_doc.save(sevis_id + ".pdf")
#
#
#     return len(seevis_ids)

#



def depi20(pdf):
    d = []
    seevis_ids = []

    with fitz.open(pdf) as doc:
        total_pages = doc.page_count
        for i in range(total_pages):
            pages = doc.load_page(i)
            page_text = pages.get_text()
            lines = page_text.split("\n")
            for line in lines:
                if 'THIS PAGE INTENTIONALLY LEFT BLANK' in line:
                    d.append(i + 1)

        print("d:", d)

    # Sort the page numbers for grouping
    d.sort()

    # Create groups based on the specified range
    g = defaultdict(list)
    current_group = []

    for page in d:
        if not current_group or page - current_group[-1] > 4:
            if current_group:
                g[len(g)] = current_group
            current_group = [page]
        else:
            current_group.append(page)

    if current_group:
        g[len(g)] = current_group

    print("g:", g)

    original_doc = fitz.open(pdf)
    f = []

    for group in g.values():
        # Calculate the range for the group
        start_page = group[0] - 4
        end_page = group[-1] + 2
        print("startpage is ", start_page)
        print("endpage is ", end_page)

        # Ensure the start_page is not less than 0
        if start_page < 0:
            start_page = 0

        # Create a new PDF document for the removed pages
        removed_doc = fitz.open()
        for j in range(start_page, end_page + 1):
            removed_doc.insert_pdf(original_doc, from_page=j, to_page=j)
            f.append(j)

        # Process SEVIS ID and save the document
        first_page = removed_doc.load_page(0)
        page_text = first_page.get_text()
        sevis_id = ""
        F2 = False

        for line in page_text.split("\n"):
            if "SEVIS ID" in line:
                sevis_id = line.split(":")[1].strip()
                seevis_ids.append(sevis_id)
                msg = 'F1'
                break

        for line in page_text.split("\n"):
            if "STUDENT'S SEVIS ID:" in line:
                F2 = True
                break

        if removed_doc.page_count and F2:
            removed_doc.save('F2-abc' + sevis_id + ".pdf")
        elif removed_doc.page_count:
            removed_doc.save(sevis_id + 'abc.pdf')

    filename = f'original{date}.pdf'
    original_doc.delete_pages(f)

    if original_doc.page_count != 0:
        original_doc.save(filename)

    with fitz.open(filename) as splitdoc:
        total_pages = splitdoc.page_count
        pages_per_file = 3
        g = []

        for i in range(total_pages):
            if i % 3 == 0:
                with fitz.open() as out_doc:
                    for j in range(i, min(i + pages_per_file, total_pages)):
                        out_doc.insert_pdf(splitdoc, from_page=j, to_page=j)

                    first_page = out_doc.load_page(0)
                    page_text = first_page.get_text()
                    sevis_id = ""
                    F2 = False

                    for line in page_text.split("\n"):
                        if "SEVIS ID" in line:
                            sevis_id = line.split(":")[1].strip()
                            seevis_ids.append(sevis_id)
                            g.append(sevis_id)
                            msg = 'F1'
                            print(msg, sevis_id)
                            print(line)
                            break

                    for line in page_text.split("\n"):
                        if "STUDENT'S SEVIS ID:" in line:
                            F2 = True
                            break

                    if out_doc.page_count and F2:
                        print("saved F2 ", sevis_id)
                        out_doc.save('F2-' + sevis_id + ".pdf")
                    elif out_doc.page_count:
                        print("saved F1 ", sevis_id)
                        out_doc.save(sevis_id + ".pdf")

    return len(seevis_ids)


