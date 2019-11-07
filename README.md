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
``` sh
git clone https://github.com/Feliciahja/BBC-MicroBits.git
``` 
### Python Script

Install following packages with pip:

- `pip install pyserial`
- `pip install pandas`
- `pip install pymysql`

### Web app

Stand in directory BBC-MicroBits/microbit/

Run command:

``` sh
npm install
``` 
### Set up database

To create the database and tables, start MySQL in a terminal and run following scripts:
1. setup.sql
2. ddl.sql

## Executing program

To collect and persist the data from the micro:bits, open and run the dataToDb.py script in a separate terminal.

On UNIX systems run command:
``` sh
python dataToDb.py
``` 
On Windows run command:
``` sh
py dataToDb.py
``` 


### Running web app

Make sure you stand in directory BBC-MicroBits/microbit/
``` sh
node index.js
``` 
Open http://localhost:1337/microbit/index

