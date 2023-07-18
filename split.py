import PyPDF2
import os

from InitialIndex import indexFile

"""Below definition is for splitting the pdf into 3 pages each and name each pdf with the seevisid"""
def splitting(pdf_path):
    # Open the PDF file in read binary mode
    with open(pdf_path, 'rb') as pdf_file:
        # Create a PdfReader object to read the PDF
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        #get total number of pages from the pdf
        num_pages = len(pdf_reader.pages)
        # Save the original PDF to a file with the same name and a "_original" suffix
        original_file_path, original_file_ext = os.path.splitext(pdf_path)
        original_file_name = original_file_path + "_original" + original_file_ext
        with open(original_file_name, 'wb') as original_file:
            original_file.write(pdf_file.read())

        # Loop through each page of the PDF
        #initiating a empty list for to store all the sevis id's
        d=[]

        for page_number in range(num_pages):
            # Check if this page number is a multiple of 3
            if (page_number + 1) % 3 == 0:
                # Create a new PdfWriter object to write the output PDF
                pdf_writer = PyPDF2.PdfWriter()

                # Add the current page to the output PDF
                for i in range(page_number - 2, page_number + 1):
                    if i < num_pages:
                        pdf_writer.add_page(pdf_reader.pages[i])

                # Extract SEVIS ID from the first page
                first_page = pdf_reader.pages[page_number - 2]
                first_page_content = first_page.extract_text()
                lines = first_page_content.split('\n')
                # from the content of first page we will get the value of key sevis id
                for line in lines:
                    key_value_pairs = line.split(':')
                    if key_value_pairs[0].strip() == 'SEVIS ID':
                        sevis_id = key_value_pairs[1].strip()
                        d.append(sevis_id)
                        new_filename = sevis_id + "_unsigned.pdf"
                        print("split",new_filename)
                        with open(new_filename, 'wb') as new_file:
                            pdf_writer.write(new_file)
    total_pages=page_number+1
    # Close the original PDF file
    pdf_file.close()
    return d,total_pages

