from io import StringIO
import pdfminer.high_level
from pdfminer.high_level import extract_text
from pdfminer.layout import LAParams


#pdf_file = "requested2.pdf"
def i20type(pdf_file):
    # Define the parameters for the layout analysis
    laparams = LAParams()

    # Extract the text from the PDF file
    print(pdf_file)
    with open(pdf_file, 'rb') as f:
        page_numbers = [0]
        pdf_text = extract_text(f,page_numbers=page_numbers, laparams=laparams)

    # Split the text into pages
    pages = pdf_text.split('\x0c')

    # Loop through each page of the PDF
    for page_number, page_content in enumerate(pages):
        # Split the page content into lines
        lines = page_content.split('\n')
        # Loop through each line of the page
        for line_number, line in enumerate(lines):
            #print(line)
            #print(f"Page {page_number}, Line {line_number}: {line}")
            # if line =='THIS PAGE INTENTIONALLY LEFT BLANK':
            #     print(f"F1 ended at page {page_number+1}")
            # if line=='GIVEN NAME':
            #     print(line,{page_number})
            #if line=="TYPE":
                #print("af")
                #print(lines[line_number])
            #print(line)
            if line=="FORM ISSUE REASON":
                print(line)
                #print(line)
                #print(lines[line_number+1])
                return lines[line_number+1]

    return None

def i20type1(pdf_file):
    # Define the parameters for the layout analysis
    laparams = LAParams()
    # Extract the text from the PDF file
    with open(pdf_file, 'rb') as f:
        page_numbers = [1]
        pdf_text = extract_text(f,page_numbers=page_numbers, laparams=laparams)

    # Split the text into pages
    pages = pdf_text.split('\x0c')

    # Initialize variables to track line numbers of interest
    employment_authorizations_line_number = None
    employment_line_number = None
    type_line={}

    # Loop through each page of the PDF
    for page_number, page_content in enumerate(pages):
        # Split the page content into lines
        lines = page_content.split('\n')
        # Loop through each line of the page

        for line_number, line in enumerate(lines):
            #print(line)
            if line == "EMPLOYMENT AUTHORIZATIONS":
                if line not in type_line:
                    type_line[line]=[]
                type_line[line].append(line_number)
                #print(employment_authorizations_line_number)
            if line == "EMPLOYER INFORMATION":
                type_line[line] = []
                type_line[line].append(line_number)
                employment_line_number = line_number
                #print(employment_line_number)
            if line== "TYPE":
                    if line not in type_line:
                        type_line[line] = []
                    type_line[line].append(line_number)

                    #print("Type in line ",line_number)

            if line == "FULL/PART-TIME":
                if line not in type_line:
                    type_line[line] = []
                #print("agfaga",line_number)
                type_line[line].append(line_number)
            if line == "STATUS":
                if line not in type_line:
                    type_line[line] = []
                type_line[line].append(line_number)
            if line == "START DATE":
                if line not in type_line:
                    type_line[line] = []
                type_line[line].append(line_number)
            if line == "END DATE":
                if line not in type_line:
                    type_line[line] = []
                type_line[line].append(line_number)
            # if line == "AUTHORIZATION DATES":
            #     if line not in type_line:
            #         type_line[line] = []
            #     type_line[line].append(line_number)
            # if line =="EMPLOYER NAME":
            #     if line not in type_line:
            #         type_line[line]=[]
            #     #print("gauigfaghfhaf",line_number)
            #     type_line[line].append(line_number)
            # if line =="CITY & STATE":
            #     if line not in type_line:
            #         type_line[line]=[]
            #     type_line[line].append(line_number)
            # if line =="CHANGE OF STATUS/CAP-GAP EXTENSION":
            #     if line not in type_line:
            #         type_line[line]=[]
            #     type_line[line].append(line_number)
            # if line =="AUTHORIZED REDUCED COURSE LOAD":
            #     if line not in type_line:
            #         type_line[line]=[]
            #     type_line[line].append(line_number)
            if line =="CURRENT SESSION DATES":
                if line not in type_line:
                     type_line[line]=[]
            #     type_line[line].append(line_number)
            if line =="CURRENT SESSION START DATE":
                if line not in type_line:
                    type_line[line]=[]
                type_line[line].append(line_number)
            if line=="TRAVEL ENDORSEMENT":
                if line not in type_line:
                    type_line[line]=[]
                type_line[line].append(line_number)
            if line =="CURRENT SESSION END DATE":
                if line not in type_line:
                    type_line[line]=[]
                type_line[line].append(line_number)
            # if line =='EMPLOYER INFORMATION':
            #     if line not in type_line:
            #         type_line[line]=[]
            #     type_line[line].append(line_number)
            # if line=='Designated School Official':
            #     if line not in type_line:
            #         type_line[line]=[]
                type_line[line].append(line_number)

    return type_line

def i20memo(my_dict,pdfFile):
    try:
        type_line = None
        full_line = None
        start_line = None
        end_line = None
        start_date=None
        end_date=None
        travel=None
        text = extract_text(pdfFile, page_numbers=[1])
        if 'TYPE' in my_dict:
            # Get the line numbers
            type_line = my_dict['TYPE'][0]
        if 'FULL/PART-TIME' in my_dict:
            full_line = my_dict['FULL/PART-TIME'][0]
        if 'START DATE' in my_dict:
            start_line = my_dict['START DATE'][0]
        if 'END DATE' in my_dict:
            end_line = my_dict['END DATE'][0]
        if  'CURRENT SESSION START DATE' in my_dict:
            start_date=my_dict['CURRENT SESSION START DATE'][0]
        if 'CURRENT SESSION END DATE' in my_dict:
            end_date=my_dict['CURRENT SESSION END DATE'][0]
        if 'TRAVEL ENDORSEMENT' in my_dict:
            travel=my_dict['TRAVEL ENDORSEMENT'][0]
        # Split the text into lines
        lines = text.split('\n')
        types = []
        dates = []
        sessionstartdate=[]
        sessionenddate=[]
        print("end date is ",end_date)
        # Print the lines from TYPE to STATUS
        for line_num, line in enumerate(lines):
            if type_line is not None and line_num >= type_line + 1 and (full_line is not None and line_num < full_line) and line.strip():
                types.append(line)

            if start_line is not None and  line_num >= start_line + 1 and (end_line is not None and line_num < end_line) and line.strip():
                dates.append(line)

            if start_date is not None and line_num==start_date+1  and line.strip():
                sessionstartdate.append(line)
            if end_date is not None and line_num == end_date + 1 and line.strip():
                print("in")
                sessionenddate.append(line)

        result = {}
        print(dates, types)
        if len(types)>1:
            result['types'] = types
            #return types[-1]
        if  len(dates)>1:
            result['dates'] = dates
            #return dates
        if  len(sessionstartdate)>0:
            result['sessionstartdate'] = sessionstartdate
            #return sessionstartdate[0]
        if len(sessionenddate)>0:
            result['sessionenddate'] = sessionenddate
        #lists = [lst for lst in [types, dates, sessionstartdate, sessionenddate] if len(lst) > 0]

        return result
    except Exception as e:
        print("Failed in i20memo function",e)

def i20memoemp(my_dict, pdfFile):

        type_line = None
        full_line = None
        start_line = None
        end_line = None
        start_date = None
        end_date = None
        travel = None
        empinfo = None
        statusline = None
        dateissued = None
        place = None
        page1_line = {}

        text = extract_text(pdfFile, page_numbers=[1])
        #print("dictiomary in i20memo is ", my_dict)
        if 'TYPE' in my_dict:
            # Get the line numbers
            type_line = my_dict['TYPE'][0]
        if 'FULL/PART-TIME' in my_dict:
            full_line = my_dict['FULL/PART-TIME'][0]
        if 'START DATE' in my_dict:
            start_line = my_dict['START DATE'][0]
        if 'END DATE' in my_dict:
            end_line = my_dict['END DATE'][0]
        if 'CURRENT SESSION START DATE' in my_dict:
            start_date = my_dict['CURRENT SESSION START DATE'][0]
        if 'CURRENT SESSION END DATE' in my_dict:
            end_date = my_dict['CURRENT SESSION END DATE'][0]
        if 'TRAVEL ENDORSEMENT' in my_dict:
            travel = my_dict['TRAVEL ENDORSEMENT'][0]
        if 'EMPLOYMENT AUTHORIZATIONS' in my_dict:
            empauth = my_dict['EMPLOYMENT AUTHORIZATIONS'][0]
        if 'EMPLOYER INFORMATION' in my_dict:
            empinfo = my_dict['EMPLOYER INFORMATION'][0]
        if 'STATUS' in my_dict:
            statusline = my_dict['STATUS'][0]
        # Split the text into lines
        lines = text.split('\n')
        types = []
        dates = []
        sessionstartdate = []
        sessionenddate = []
        enddates = []
        status = []
        dateofissue = []
       # print("end date is ", end_date)
        # Print the lines from TYPE to STATUS
        for line_num, line in enumerate(lines):
            if type_line is not None and line_num >= type_line + 1 and (
                    full_line is not None and line_num < full_line) and line.strip():
                types.append(line)
            if start_line is not None and line_num >= start_line + 1 and (
                    end_line is not None and line_num < end_line) and line.strip():
                dates.append(line)
            if start_date is not None and line_num == start_date + 1 and line.strip():
                sessionstartdate.append(line)
            if end_date is not None and line_num == end_date + 1 and line.strip():
                print("in")
                sessionenddate.append(line)
            if end_line is not None and line_num >= end_line + 1 and (
                    empinfo is not None and line_num < empinfo) and line.strip():
                enddates.append(line)
            if statusline is not None and line_num == statusline + 1 and line.strip():
                status.append(line)
            if start_line is not None and line_num == start_line - 2 and line.strip():
                status.append(line)
        result = {}
        #print(dates, types)
        if len(types) > 1:
            #print('types are ', types)
            result['types'] = types
            # return types[-1]
        if len(dates) > 1:
            #print('dates are ', dates)
            result['dates'] = dates
            # return dates
        if len(enddates) > 0:
            #print("end dates are in emp auth ", enddates)
            result['endates'] = enddates
        if len(status) > 0:
            result['status'] = status
        #print("result is", result)
        #print(len(result['types']))
        if 'REQUESTED' in result['status']:
            print('yes')
            laparams = LAParams()
            with open(pdfFile, 'rb') as i20:
                page_numbers = [0]
                text_pdf = extract_text(i20, page_numbers=page_numbers, laparams=laparams)
            page1 = text_pdf.split('\x0c')
            for pagenumber, pagecontent in enumerate(page1):
                pagelines = pagecontent.split('\n')
                # print(pagelines)
                for linenumber, line1 in enumerate(pagelines):

                    if line1 == 'DATE ISSUED':
                        if line1 not in page1_line:
                            page1_line[line1] = []
                        page1_line[line1].append(linenumber)
                    if line1 == 'PLACE ISSUED':
                        if line1 not in page1_line:
                            #print("int loop ")
                            page1_line[line1] = []
                        page1_line[line1].append(linenumber)
            #print(page1_line)
            if 'DATE ISSUED' in page1_line:
                dateissued = page1_line['DATE ISSUED'][0]
            if 'PLACE ISSUED' in page1_line:
                place = page1_line['PLACE ISSUED'][0]
            text = extract_text(pdfFile, page_numbers=[0])
            page1lines = text.split('\n')
            for linenum, line1 in enumerate(page1lines):
                if dateissued is not None and linenum >= dateissued + 1 and (
                        place is not None and linenum < place) and line1.strip():
                    dateofissue.append(line1)

            if len(dateofissue) > 0:
                #print(dateofissue)
                result['empissue'] = dateofissue
        if result['types'] and result['status']:
            empinfo = zip(result['types'], result['dates'], result['endates'], result['status'])
        employment = next((t[0] for t in list(empinfo) if 'REQUESTED' in t), None)
        #print(employment, (dateofissue[0]))

        return (employment,dateofissue[0])

# f=i20type1('N0034099187_unsigned.pdf')
# print(f)
# k=i20memo(f,'N0034099187_unsigned.pdf')
# print(k)

# g=i20type(pdf_file)
# print(g)

#
# g=i20type1(pdf_file)
# print(g)
# f=i20memo(g,pdf_file)
# print(f)
# # #

# import pandas as pd
# df=pd.read_excel('Book1.xlsx')
# for i in range(len(df)):
#     print(i)
#     sevis=df.iloc[i]['SEVIS ID']
#
# #print(sevis)
# for i in range(len(df)):
#     sevisid = df.iloc[i]['SEVIS ID']
#     #print(sevisid)
#     f = i20type(sevisid + '.pdf')
#     if 'CONTINUED ATTENDANCE' in f:
#         g = i20type1(sevisid + '.pdf')
#         # print(g)
#         f = i20memo(g)
#
# print(f)
# print(type(str(f)))
