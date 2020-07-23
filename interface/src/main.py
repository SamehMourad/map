from flask import Flask, request, jsonify

from utils import Maps

from validator import AreaInput

app = Flask(__name__)


@app.route('/', methods=['POST'])
def in_ploy():
    errors = {}
    data = request.json or {}
    if 'lat' not in data or not data['lat']:
        errors['lat'] = ['Latitude is Required']
    if 'lng' not in data or not data['lng']:
        errors['lng'] = ['Latitude is Required']
    # if  is None:
    #     errors = {'lat' : , 'lng': }
    if errors:
        return errors, 422
    area = Maps.getInstance().in_poly(data['lat'], data['lng'])
    res = {
        'exists': bool(area)
    }
    if area:
        res['area'] = area
    return res


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=5050)
