import json

import mysql.connector
from flask import Flask, render_template

app = Flask(__name__)


class Area:
    def __init__(self, area):
        self.area = area

    def to_json(self):
        return {
            'id': self.area[0],
            'name': self.area[1],
            'minPerOrder': self.area[2],
            'points': json.loads(self.area[3])
        }


@app.route('/map')
def _map():
    mydb = mysql.connector.connect(
        host="asasy-do-user-7627257-0.a.db.ondigitalocean.com",
        user="doadmin",
        database="bleed",
        password="ub1fs8s0yp8kkrub",
        port=25060
    )
    cursor = mydb.cursor()
    cursor.execute('select * from areas where points is not null')
    areas = [Area(area).to_json() for area in cursor.fetchall()]
    return render_template('map.html', areas = areas)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=8080)