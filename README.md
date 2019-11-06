# BBC-MicroBits
Web based application for monitoring and measuring room temperature and light with multiple sensors. Web-app provides interface to place sensor location within room.

## Requirements

- Node.js version 10.15.0
- Python 3.7.3
- pip
- MySQL
- Chrome


## Common setup

Clone the repo and install the dependencies.

git clone https://github.com/Feliciahja/BBC-MicroBits.git

### Python Script

Install following packages with pip:

- pip install pyserial
- pip install pandas
- pip install pymysql

### Web app

Stand in directory BBC-MicroBits/microbit/

Run command:

``` sh
npm install
``` 
### MySQL

Log in to the database and run following scripts:
1. setup.sql
2. ddl.sql

## Executing program

Run python-script in a separate terminal.

### Running web app

Make sure you stand in directory BBC-MicroBits/microbit/
``` sh
node index.js
``` 
Open http://localhost:1337/microbit/index

