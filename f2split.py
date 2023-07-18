import PyPDF2

def remove_pages(pdf_file, pages_to_remove):
    """
    Removes the specified pages from the given PDF file and saves the removed pages as separate PDF files.
    """
    # Open the original PDF file
    with open(pdf_file, 'rb') as f:
        pdf_reader = PyPDF2.PdfReader(f)
        num_pages = len(pdf_reader.pages)

        # Create PDF writers for the original PDF and the removed pages
        pdf_writer_orig = PyPDF2.PdfWriter()
        pdf_writer_removed = PyPDF2.PdfWriter()

        # Loop over the pages in the original PDF
        for i in range(num_pages):
            if i in pages_to_remove:
                # Add the page to the removed pages PDF
                page = pdf_reader.pages[i]
                pdf_writer_removed.add_page(page)
            else:
                # Add the page to the original PDF
                page = pdf_reader.pages[i]
                pdf_writer_orig.add_page(page)

        # Write the original PDF with the specified pages removed
        with open(f"{pdf_file[:-4]}_without_{pages_to_remove}.pdf", "wb") as f:
            pdf_writer_orig.write(f)

        # Write the removed pages as a separate PDF file
        with open(f"{pdf_file[:-4]}_removed_{pages_to_remove}.pdf", "wb") as f:
            pdf_writer_removed.write(f)


remove=[4,8]
remove_pages('i20.pdf',remove)