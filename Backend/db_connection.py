import mysql.connector

db_config = {
    "host": "localhost",
    "user": "root",  # add Username
    "password": "",  # Add Password
    "database": "fastsql"  # Add Database Name
}


def get_db_connection():
    return mysql.connector.connect(**db_config)
