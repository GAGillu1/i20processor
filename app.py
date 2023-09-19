import os
from datetime import datetime
from readdata import namesread, logusers
from readdata import statusread
from readdata import logsread

from flask import Flask, render_template, request, send_file, make_response, jsonify, Response, session


cwd=os.getcwd()
app = Flask(__name__,template_folder=cwd, static_folder='static')
@app.route('/hours',methods=['GET','POST'])
def home():
    if request.method=='GET':
        return render_template('hours.html')

#route for displaying names in homepage dropdown
@app.route('/getNames',methods=['GET','POST'])
def names():
    if request.method == 'GET':
        #from the namesread() function we get all names
        allnames = namesread()
        #dataframe is converted to list
        names = allnames.tolist()
        #list is sent as json format
        return jsonify({'names': names})
#route for status tab
@app.route('/status',methods=['GET','POST'])
def status():
    if request.method=='GET':
        #from the statusread() we get the status data
        data=statusread()
        #dataframe is converted to dictionary and returned as json .
        return jsonify({'Status': data.to_dict('records')})

#route for log tab
@app.route('/log',methods=['GET','POST'])
def log():
    if request.method=='GET':
        #from logsread() function we get the dataframe
        logdata=logsread()
        print(logdata)
        #dataframe is converted to dictionary and returned as json
        return jsonify({'Log':logdata.to_dict('records')})
#route for submit button in dashboard
@app.route('/submit',methods=['GET','POST'])
def submit():
    if request.method=='POST':
        #getting data from the frontend
        data=request.get_json()
        #extracting names from the data
        name=data['empNames']
        print("/*/*/*/*",name)
        print(len(name))
        print(data)
        #looping through the data and extracting the starttime, endtime, hours and comments from the frontend
        for i in range(len(name)):
            name=data['empNames'][i]
            print(name)
            print(i)
            starttime = data['stList'][i]
            endtime = data['etList'][i]
            hours = int(data['hoursList'][i])
            comments=data['commentsList'][i]
            print(type(comments))
            #if comments is none then hardcoding it to General and run the macros
            if not comments:
                comments="General"
            starttime_object = datetime.strptime(starttime, "%Y-%m-%dT%H:%M")
            endtime_object=datetime.strptime(endtime, "%Y-%m-%dT%H:%M")
            #executing the macros with the given inputs passed as aruments
            excelmacro(name, starttime_object, endtime_object, hours,comments)
        return "Success"

#route for log of specified user. User is passed through URL
@app.route('/log/<string:user>', methods=['POST', 'GET'])
def loguser(user):
    if request.method == 'GET':
        #logusers(user) gives the log of specified user
        log=logusers(user)
        print(type(log))
        #if the selected student is not there in log then no records is returned
        if(isinstance(log,str)):
            response = make_response("No records")
            response.status_code = 201
            return response
        else:
            return log




        # if log==None:
        #     response=make_response("No records")
        #     response.status_code = 201
        #     return response
        # #if selected student is in log then dataframe is converted to dictioanry and returned as json
        # else :
        #     print("/*/*/*")
        #     return jsonify({'Log': log.to_dict('records')})



if __name__ == '__main__':
    app.run()
