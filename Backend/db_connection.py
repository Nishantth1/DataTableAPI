import mysql.connector

db_config = {
    "host": "HOST",
    "user": "DB_USER",  # add Username
    "password": "PASSWORD",  # Add Password
    "database": "DB_NAME"  # Add Database Name
}


def get_db_connection():
    return mysql.connector.connect(**db_config)
