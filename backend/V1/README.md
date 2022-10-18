# Run as docker container, instructions:
```
docker-compose up --build
```

### To delete container
```
docker-compose down
```



# Run as development server, instructions:

### Install ODBC driver 18 for connection to sql server

https://learn.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-ver16

```
pythom -m venv venv

source venv/bin/activate

pip install -r requirements.txt

export FLASK_APP=src

flask run --host=0.0.0.0
```
