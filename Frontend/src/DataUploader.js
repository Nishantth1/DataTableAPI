import React, { useState, useEffect, useCallback } from "react";
import { uploadData, getData } from "./api";
import "./index.css";

const DataUploader = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName("");
      alert("Please select a CSV file.");
    }
  };

  const handleUpload = async () => {
    try {
      if (file) {
        const response = await uploadData(file);
        console.log(response.message);
        setIsUploadSuccess(true);
      } else {
        console.error("No file selected.");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handleGetData = useCallback(async () => {
    try {
      const response = await getData();
      console.log("Frontend", response);
      setData(response.data || []);
      setIsDataFetched(true);
      localStorage.setItem("fetchedData", JSON.stringify(response.data || []));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("fetchedData");
    if (storedData) {
      setData(JSON.parse(storedData));
      setIsDataFetched(true);
    }
  }, []);

  useEffect(() => {
    setData([]);
    setIsDataFetched(false);
  }, []);

  return (
    <div>
      <div className="file-input-container">
        <input
          type="file"
          id="file"
          className="file-input"
          accept=".csv"
          onChange={handleFileChange}
        />
        <label htmlFor="file" className="file-input-label">
          Choose File
        </label>
      </div>
      {fileName && <p>Selected File: {fileName}</p>}
      <div className="button-container">
        <button onClick={handleUpload}>Upload Data</button>
        <button onClick={handleGetData}>Get Data</button>
      </div>

      {isUploadSuccess && <p class="msg">Upload successful!</p>}

      {isDataFetched ?  (
        <>
        <p class="msg">Data Fetched successful!</p>
          <h2>Data Table</h2>
          <table className="table-container">
            <thead>
              <tr>
                <th>ID</th>
                <th>Datetime</th>
                <th>Close</th>
                <th>High</th>
                <th>Low</th>
                <th>Open</th>
                <th>Volume</th>
                <th>Instrument</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="8">No data available</td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.datetime}</td>
                    <td>{row.close}</td>
                    <td>{row.high}</td>
                    <td>{row.low}</td>
                    <td>{row.open}</td>
                    <td>{row.volume}</td>
                    <td>{row.instrument}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default DataUploader;
