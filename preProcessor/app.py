import zipfile
from flask import Flask, request, send_file, make_response, render_template
from issmfilelog import set_new_log_file, logger
from test_wvpn import vpn_function
import http
import os

cwd = os.getcwd()
app = Flask(__name__, template_folder=cwd, static_folder='static')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process', methods=['GET', 'POST'])
def process():
    try:
        if request.method == "POST":
            zip_filename = 'files.zip'
            set_new_log_file()
            logger.info(f"started process function in app.py")
            status, text = vpn_function()
            print(f"status: {status}, text: {text}")
            if status and text == "Partial success":
                with zipfile.ZipFile(zip_filename, 'w') as zipf:
                    # Add the files to the zip archive
                    zipf.write('Duplicate.xlsx')
                    # zipf.write(file_name)
                response = make_response(send_file(zip_filename, as_attachment=True))
                response.headers['Content-Disposition'] = 'attachment; filename=output.zip'
                # logger.info(f"Process Completed")
                logger.info(response)
                return response, http.HTTPStatus.OK
                # return "Success"
            elif status and text == "Success":
                response = make_response({'message': text}, http.HTTPStatus.OK)
                return response, http.HTTPStatus.OK
            elif status and text == "Failed":
                response = make_response({'message': text}, http.HTTPStatus.BAD_REQUEST)
                return response, http.HTTPStatus.BAD_REQUEST
            else:
                logger.error(text)
                response = make_response({'message': text}, http.HTTPStatus.UNAUTHORIZED)
                return response, http.HTTPStatus.UNAUTHORIZED
    except Exception as e:
        logger.error("Exception in app.py exception", e)
        response = None
        return response, http.HTTPStatus.INTERNAL_SERVER_ERROR

if __name__ == '__main__':
    app.run(debug=True)
