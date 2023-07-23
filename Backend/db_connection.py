import mysql.connector

db_config = {
    "host": "localhost",
    "user": "username",  # add Username
    "password": "",  # Add Password
    "database": "DB_NAME"  # Add Database Name
}


def get_db_connection():
    return mysql.connector.connect(**db_config)
