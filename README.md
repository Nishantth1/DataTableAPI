# DataTableAPI

DataTableAPI is a web application that allows users to upload CSV files containing financial data and view the data in a tabular format.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
- Upload CSV files containing financial data.
- View the data in a tabular format with options to sort and filter.
- Retrieve the data from the backend using API endpoints.
- Display success messages for successful data upload and retrieval.

## Getting Started
### Prerequisites
- Node.js (version v18.15.0)
- Python (version 3.10.2)
- MySQL or any other database system

### Installation
1. Clone this repository to your local machine.
2. Install the required dependencies for the frontend by running: npm install
3. Install the required dependencies for the backend by running: pip install -r requirements.txt
4. 4. Set up your database by creating a database and table as described in the backend's `main.py` file.
5. Update the database connection details in the backend's `main.py` file.

## Usage
1. Start the backend server by running: uvicorn main:app --host 0.0.0.0 --port 8000
2. Start the frontend development server by running: npm start
3. 3. Access the web application at `http://localhost:3000`.

## API Endpoints
- `/upload_data/`: POST request to upload CSV file.
- `/get_data/`: GET request to retrieve the data in JSON format.

## Technologies Used
- React.js (Frontend)
- FastAPI (Backend)
- MySQL (Database)

## Contributing
Contributions are welcome! If you find any bugs or want to add new features, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Output
![output](https://github.com/Nishantth1/DataTableAPI/assets/97899868/05ce30bb-09e5-4ca2-b267-ac77414e515c)
![out2](https://github.com/Nishantth1/DataTableAPI/assets/97899868/f5e7f69a-99d1-4cfb-8aec-aa6ec3aea9ae)



