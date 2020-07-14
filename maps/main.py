from flask import Flask, render_template
from utils import Maps
app = Flask(__name__)


@app.route('/')
def in_ploy():
    return {
        'exists': Maps.getInstance().in_poly(-33.62977627863567, 149.6387509765625)
    }


@app.route('/map')
def map():
    return render_template('map.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=8080)