import pandas as pd
def insert_into_excel_file(userName, logResponse, institutionId, sessionResult, errorMessage
                           , backendProcessor, file_name='output_log_data.xlsx'):
    # Create a DataFrame from the function arguments
    data = {
        'UserName': [userName],
        'LogResponse': [logResponse],
        'InstitutionId': [institutionId],
        'SessionResult': [sessionResult],
        'ErrorMessage': [errorMessage],
        'BackendProcessor': [backendProcessor]
    }
    new_data = pd.DataFrame(data)

    # Try to read the existing Excel file
    try:
        existing_data = pd.read_excel(file_name)
        # Append the new data
        updated_data = pd.concat([existing_data, new_data], ignore_index=True)
    except FileNotFoundError:
        # If the file does not exist, the new data becomes the existing data
        updated_data = new_data

    # Write the updated DataFrame to the Excel file
    updated_data.to_excel(file_name, index=False)

