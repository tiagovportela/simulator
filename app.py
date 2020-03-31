from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/simulation')
def simulation():
    return render_template('simulation.html')

if __name__ == "__main__":
    #app.run(host='0.0.0.0',debug=True)
    app.run(host='0.0.0.0')