import bcrypt
from functools import wraps
from flask import Flask, redirect, render_template, request, session, url_for

app = Flask(__name__)




app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
valid_email = '40162946@napier.ac.uk'
valid_pwhash = bcrypt.hashpw('password1234', bcrypt.gensalt())

def check_auth(email , password):
        if(email == valid_email and valid_pwhash == bcrypt.hashpw(password.encode('utf -8'), valid_pwhash)):
                return True
        return False

def requires_login(f):
        @wraps(f)
        def decorated(*args , **kwargs):
                status = session.get('logged_in', False)
                if not status:
                        return redirect(url_for('.root'))
                return f(*args , **kwargs)
        return decorated

@app.route('/logout/')
def logout():
        session['logged_in'] = False
        return redirect(url_for('.root'))

@app.route('/index.html/')
@requires_login
def index():
    return render_template('index.html')

@app.route("/", methods=['GET', 'POST'])
def root():
        if request.method == 'POST':
                user = request.form['email']
                pw = request.form['password']

                if check_auth(request.form['email'], request.form['password']):
			session['logged_in'] = True
                	return redirect(url_for('.index'))
        return render_template('login.html')

@app.route ('/index/apod/apod.html/')
@requires_login
def apod():
    return render_template('/index/apod/apod.html')

@app.route ('/index/neows/neows.html/')
@requires_login
def neows():
    return render_template('/index/neows/neows.html')

@app.errorhandler(404)
def page_not_found(error):
    return "Couldn't find the page you requested or page may not exist, please check the URL in  address bar and try again.", 404

@app.errorhandler(403)
def forbidden(error):
    return "You do not have permission to access this resource, contact system administator for access rights", 403

@app.errorhandler(500)
def Internal_Server_Error(error):
    return "There has been an internal error, please try again", 500

@app.errorhandler(503)
def Service_Unavailable(error):
    return "Web server unavailable, please contact system administrator", 503

@app.errorhandler(504)
def Gateway_Timeout(error):
    return "Gateway has timed out, possible DNS error, please try again.", 504

@app.route("/index/neows/neows/")
@requires_login
def neows_redirect():
        return redirect("http://set09103.napier.ac.uk:9135/index/neows/neows.html/" )

@app.route("/index/apod/apod/")
@requires_login
def apod_redirect():
        return redirect("http://set09103.napier.ac.uk:9135/index/apod/apod.html/")

@app.route("/index/")
def index_redirect():
        return redirect("http://set09103.napier.ac.uk:9135/index.html/")

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)


