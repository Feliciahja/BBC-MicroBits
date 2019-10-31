import serial, time
import pymysql
import pandas as pd
import sys

from datetime import datetime
    
port = "COM4"
baud = 115200
s = serial.Serial(port)
s.baudrate = baud

host = 'localhost'
user = 'user'
password = 'pass'
database = 'microbit'

try:
    con = pymysql.connect(host=host,
                            user=user,
                            password=password,
                            database=database,
                            autocommit=True,
                            local_infile=1)
    print('Connected to DB: {}'.format(host))
    
except Exception as e:
    print('Error: {}'.format(str(e)))
    sys.exit(1)


while (True):
    data = s.readline()
    data = data.decode()
    data = data.replace('\r\n', '') 
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    data = "'" + str(timestamp) + "'" + ',' + str(data)
    print(data)
    insert_statement = 'INSERT INTO `data`(`time`, id, temperature, light_level) VALUES(%s);' % (data)
    cursor = con.cursor()
    cursor.execute(insert_statement) 
    time.sleep(2)

con.close()