import base64

import bcrypt
from flask import Flask, render_template, request, send_file, make_response, jsonify, Response, session, redirect, \
    url_for, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import os

import issm_log
from login import checklogin

cwd=os.getcwd()

app = Flask(__name__,template_folder=cwd,static_folder='static')
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'  # Change this to a random value
login_manager = LoginManager(app)
login_manager.login_view = 'login'
# Replace the following User class with your database model or user storage system
class User(UserMixin):
    def __init__(self, userid, username, password_hash, email, school_name,active,salt):
        self.id = userid
        self.username = username
        self.password_hash = password_hash
        self.email = email
        self.school_name = school_name
        self.is_active=active
        self.salt=salt

users = {
    1: User(1, 'user1', 'hashed_password1', 'user1@example.com', 'School A',active=True,salt='salttest'),
    2: User(2, 'user2', 'hashed_password2', 'user2@example.com', 'School B',active=True,salt='salttest'),
}

@login_manager.user_loader
def load_user(user_id):
    return users.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = 'user1'
        password = 'hashed_password1'

        # Check if the username and password are correct
        user = next((user for user in users.values() if user.username == username), None)
        print(user)
        if user and password == user.password_hash:
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password', 'error')

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        print("username is ",username)
        password = request.form['password']
        email = request.form['email']
        school_name = request.form['school_name']

        # Check if the username is already taken
        if any(user.username == username for user in users.values()):
            flash('Username already taken. Please choose a different username.', 'error')
            return redirect(url_for('register'))

        # Create a new user object (you should use a proper hashing method for password in a real application)
        new_user_id = max(users.keys()) + 1
        salt = bcrypt.gensalt()
        stringsalt = salt.decode('utf-8')
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
        pwd = password_hash.decode('utf-8')

        new_user = User(new_user_id, username, pwd, email, school_name,pwd,salt)
        users[new_user_id] = new_user
        print(users)

        flash('Registration successful. You can now log in!', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')
@app.route('/dashboard')
@login_required
def dashboard():
    return f'Welcome, {current_user.username}!'


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
