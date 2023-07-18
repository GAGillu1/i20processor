import PyPDF2

def pages(file):
    pdf_file=open(file,'rb')
    pdf_reader=PyPDF2.PdfReader(pdf_file)
    num_pages = len(pdf_reader.pages)

    return num_pages



