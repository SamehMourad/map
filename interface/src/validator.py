from flask_inputs import Inputs
from flask_inputs.validators import JsonSchema


schema = {
    'type': 'object',
    'properties': {
        'lat': {'type': "number"},
        "lng": {'type': 'number'}
    },
    'required': ['lat', 'lng']
}


class AreaInput(Inputs):
    json = [JsonSchema(schema=schema)]
