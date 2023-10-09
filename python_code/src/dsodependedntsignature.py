from io import StringIO
import fitz
import datetime

today = datetime.datetime.today()
date = today.strftime('%Y%m%d')

def dependentsignature(pdf, signaturepath,output_file, length, width, xco, yco,pages):
    signature_path = signaturepath  # Replace with the actual path to your signature image
    user_signatures = {"elisa": {"size": (length, width), "position": (xco, yco)}}
    user_signature = user_signatures["elisa"]
    y = (792 - user_signature["position"][1] - user_signature['size'][1])
    z = y + user_signature['size'][1]
    sig_rect = fitz.Rect(user_signature["position"][0], y, user_signature['position'][0] + user_signature['size'][0], z)
    signature_image = fitz.Pixmap(signature_path)
    with fitz.open(pdf) as doc:
        for page_number in pages:
            page=doc[page_number]
            page.insert_image(sig_rect, pixmap=signature_image)
        doc.save(output_file)
def depensignature(pdf, signature_path,output_file, length, width, xco, yco):
    d = []
    g = {}
    seevis_ids = []

    with fitz.open(pdf) as doc:
        total_pages = doc.page_count
        for page_number in range(total_pages):
            page = doc.load_page(page_number)
            page_text = page.get_text()
            if 'SURNAME/PRIMARY NAME' in page_text and 'SCHOOL INFORMATION' in page_text:
                d.append(page_number)

    dependentsignature(pdf, signature_path, output_file,length, width, xco, yco, d)

# f = dependentsignature('May1723Signed.pdf', 'emedina.png', 152, 50, 90, 190)
# print(f)
