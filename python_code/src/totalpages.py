import PyPDF2

def pages(file):
    print("in pages")
    pdf_file=open(file,'rb')
    pdf_reader=PyPDF2.PdfReader(pdf_file)
    num_pages = len(pdf_reader.pages)
    print("pages are",num_pages)

    return num_pages



