from flask import Flask, jsonify, request,make_response
from flask_mysqldb import MySQL
from datetime import timedelta,timezone,datetime
import string,secrets,requests
import jwt
from jwt.exceptions import ExpiredSignatureError

import yaml,json
from passlib.hash import sha256_crypt
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "ooh_so_secret"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = True
app.config['JWT_COOKIE_HTTPONLY'] = True
app.config['JWT_COOKIE_SAMESITE'] = 'Strict'
jwt = JWTManager(app)
db = yaml.full_load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)
import models

def verify_jwt_token():
    jwt_token = request.cookies.get("access_token")  # Retrieve the JWT token from the httpOnly cookie
    if not jwt_token:
        print("token not found")
        return False
    
    try:
        return True
    except ExpiredSignatureError:
        return False


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(hours=1))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/login',methods=['POST'])
def login():
    users = models.Table("users","Email_ID","Password")
    email = request.json['Email_ID']
    password = request.json['Password']
    hashed_password = sha256_crypt.hash(password)
    print(hashed_password)
    user = users.getone("Email_ID",email)
    if user is None:
        print("Outer if reached")
        return jsonify(status="User Not Found")
    else:
        og_pass = user[1]
        if not sha256_crypt.verify(password,og_pass):
            return jsonify(status="Invalid Password")
        else:
            access_token = create_access_token(identity=email)
            response=make_response(jsonify(status="Auth Success!",atk=access_token))
            response.set_cookie('access_token',access_token)
            return response

@app.route('/checkMail', methods=['POST'])
def check():
    email=request.get_json()
    users = models.Table("users","Email_ID")
    user=users.getone("Email_ID",email)
    genotp=''.join(secrets.choice(string.ascii_uppercase + string.digits)
                            for i in range(7))
    if user is None:
        return jsonify(status="User not Found")
    else:
        url = "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send"

        payload = {
            "personalizations": [
                {
                    "to": [{ "email": email }],
                    "subject": "Otp"
                }
            ],
            "from": { "email": "richie.thakkar@gmail.com" },
            "content": [
                {
                    "type": "text/plain",
                    "value": genotp
                }
            ]
        }
        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": "9eabe601b6msh1ea06cb8d54a0d4p15c5ffjsn511bfb4c034f",
            "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com"
        }
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code==202:
            return jsonify(status="found",otp=genotp)
        else:
            return jsonify(status="Not found")


@app.route('/updatePassword',methods=['POST'])
def updatePassword():
    email=request.json['email']
    newPassword=request.json['newPassword']
    users=models.Table("users","Email_ID","Password")
    hashed_password = sha256_crypt.hash(newPassword)
    user=users.updateOne(hashed_password,"Password",email)
    if user is None:
        return jsonify(status="fail")
    else:
        return jsonify(status="success")


    




@app.route('/logout',methods=['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/signup', methods=['POST'])
def signup():
    users = models.Table("users", "Email_ID", "FirstName", "LastName","Password")
    FirstName = request.json['FirstName']
    LastName = request.json['LastName']
    Email_ID = request.json['Email_ID']
    Password = request.json['Password']
    
    # Check if the email already exists in the database
    if users.getone("Email_ID", Email_ID) is not None:
        return jsonify(status="Email already exists")
    
    
    
    # Hash the password using sha256_crypt
    hashed_password = sha256_crypt.hash(Password)
    
    # Insert the new user into the database
    user_data = {
        "FirstName": FirstName,
        "LastName": LastName,
        "Email_ID": Email_ID,
        "Password": hashed_password
    }
    users.insert(user_data)
    
    return jsonify(status="Signup Success!")




@app.route('/insertReport',methods=['POST'])
def insert_report():
    token = verify_jwt_token()
    if not token:
        return jsonify(message='Invalid or expired JWT token'), 401
    
    Email_ID = request.json['Email_ID']
    Mood=request.json['MTScore']
    SRQ=request.json['quiz1Score']
    PHQ=request.json['quiz2Score']
    GAD=request.json['quiz3Score']
    now=datetime.now()
    modnow=now.strftime("%Y-%m-%d %H:%M:%S")
    reports=models.Table("reports","Email_ID","Mood","SRQ","PHQ","GAD","Date_and_time")
    report_data={
        "Email_ID":Email_ID,
        "Mood":Mood,
        "SRQ":SRQ,
        "PHQ":PHQ,
        "GAD":GAD,
        "Date_and_time":modnow
    }
    reports.insert(report_data)
    return jsonify("Insertion Succesful")


@app.route('/getReport',methods=['POST'])
def getReport():
    token = verify_jwt_token()
    if not token:
        return jsonify(message='Invalid or expired JWT token'), 401
    Email_ID=request.json["Email_ID"]
    reports=models.Table("reports","Email_ID","Mood","SRQ","PHQ","GAD","Date_and_time")
    results=reports.getall("Email_ID",Email_ID)
    return jsonify(results)    

@app.route('/getPsy',methods=['POST'])
def get_Psy():
    token = verify_jwt_token()
    if not token:
        return jsonify(message='Invalid or expired JWT token'), 401
    psy=models.Table("Psy","id","Name","Rating","Experience","Location","Gender","Degree","Languages","Phone","Fees")
    results=psy.getall("1","1")
    return jsonify(results)
# @app.route("/TeacherDashboard", methods=['POST'])
# def tdetails():
#     sessionId = request.json["sessionId"]
#     print(sessionId)
#     tchs = models.Table("teaches","tid","sid")
#     results=tchs.getsids(sessionId)
#     subs=models.Table("subjects","sid","sname")
#     subjectlist=[]
#     for result in results:
#         temp=subs.findsub(result)
#         print(subs.findsub(result))
#         subjectlist.append(temp)
#     response = {'subjects': subjectlist}
#     return jsonify(response)
    

    


        


if __name__ == '__main__':
    app.run(debug=True)