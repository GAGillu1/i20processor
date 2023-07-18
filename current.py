import pdfplumber

with pdfplumber.open("requested.pdf") as pdf:
    page = pdf.pages[0] # Assuming the employment authorization is on the first page
    text = page.extract_text()


import re

match = re.search(r"Employment Authorization.*(\d{2} [A-Z]{3} \d{4})-(\d{2} [A-Z]{3} \d{4})", text)
if match:
    start_date = match.group(1)
    end_date = match.group(2)
    print(f"Employment authorization valid from {start_date} to {end_date}")
else:
    print("Employment authorization not found")
