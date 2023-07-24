from fastapi import FastAPI, UploadFile, File, HTTPException
import pandas as pd
import mysql.connector
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from db_connection import get_db_connection

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",  # Add such origins for handling CORS
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Wildcards should not be used for Production works.
    allow_headers=["*"],
)


@app.post("/upload_data/")
async def upload_data(file: UploadFile = File(...)):

    if file.content_type != "text/csv":
        raise HTTPException(
            status_code=400, detail="Only CSV files are allowed for upload.")

    conn = get_db_connection()
    cursor = conn.cursor()
    content = await file.read()
    data = pd.read_csv(BytesIO(content))
    query = "INSERT INTO ticker_data (datetime, open, high, low, close, volume, instrument) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    for _, row in data.iterrows():
        values = tuple(row[['datetime', 'open', 'high', 'low',
                       'close', 'volume', 'instrument']].values)
        cursor.execute(query, values)
    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Data uploaded successfully."}


@app.get("/get_data/")
async def get_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM ticker_data")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    data = []
    for row in rows:
        data.append({
            "id": row[0],
            "datetime": row[1],
            "close": row[2],
            "high": row[3],
            "low": row[4],
            "open": row[5],
            "volume": row[6],
            "instrument": row[7]
        })

    return {"data": data}
