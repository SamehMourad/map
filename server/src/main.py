import json

from flaskext.mysql import MySQL
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pymysql
app = Flask(__name__)
app.config.update(
MYSQL_DATABASE_HOST= 'asasy-do-user-7627257-0.a.db.ondigitalocean.com',
MYSQL_DATABASE_PORT=25060,
MYSQL_DATABASE_USER='doadmin',
MYSQL_DATABASE_PASSWORD='ub1fs8s0yp8kkrub',
MYSQL_DATABASE_DB='bleed'
)
mysql = MySQL()
mysql.init_app(app)
CORS(app)
# db = mysql.connector.connect(
#         host="asasy-do-user-7627257-0.a.db.ondigitalocean.com",
#         user="doadmin",
#         database="bleed",
#         password="ub1fs8s0yp8kkrub",
#         port=25060
#     )
# cursor = db.cursor()

@app.route('/', methods=['POST'])
def store():
    errors = {}
    data = request.json or {}
    if 'name' not in data or not data['name']:
        errors['name'] = ['Name is Required']
    if 'polygon' not in data or not data['polygon']:
        errors['polygon'] = ['Polygon is Required']
    if errors:
        return errors
    cursor = mysql.get_db().cursor(pymysql.cursors.DictCursor)
    try:
        cursor.execute('insert into areas (name, points) values (%s, %s)', (data['name'], json.dumps(data['polygon'])))
        mysql.get_db().commit()
        cursor.execute('SELECT * FROM areas where id=%s', (cursor.lastrowid))
        row = cursor.fetchone()
        row['points'] = json.loads(row['points'])
        return {
            'status': True,
            'area': row
        }
    except pymysql.err.OperationalError as error:
        print(error)
    finally:
        cursor.close()


@app.route('/areas')
def areas():
    cursor = mysql.get_db().cursor(pymysql.cursors.DictCursor)
    cursor.execute('select * from areas where points is not null')
    areas = cursor.fetchall()
    for area in areas:
        area['points'] = json.loads(area['points'])
    return jsonify(areas)


@app.route('/areas/<int:area_id>', methods=['PUT', 'PATCH'])
def area(area_id):
    data = request.json or {}
    cursor = mysql.get_db().cursor()
    sql = 'update areas set '
    if 'name' in data and data['name']:
        sql += 'name = \'' + data['name'] + '\''
        sql += ', '
    if 'points' in data and data['points']:
        sql += 'points=\'' + json.dumps(data['points']) + '\''
    sql += ' WHERE id = ' + str(area_id)
    cursor.execute(sql)
    mysql.get_db().commit()
    return {
        'status': True
    }

@app.route('/areas/<int:area_id>', methods=['DELETE'])
def remove(area_id):
    cursor = mysql.get_db().cursor()
    sql = 'DELETE FROM areas WHERE id=%s'
    cursor.execute(sql, (area_id))
    return {
        'status': True
    }
@app.route('/map')
def _map():
    cursor = mysql.get_db().cursor()
    cursor.execute('select * from areas where points is not null')
    areas = cursor.fetchall()
    for area in areas:
        area['points'] = json.loads(area['points'])
    return render_template('map.html', areas = areas)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=8080)