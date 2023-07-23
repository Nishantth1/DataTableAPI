
const API_BASE_URL = 'http://192.168.225.76:8000'; //Use IP address or local 

export const uploadData = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/upload_data/`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error uploading data:', error);  
  }
};

// Function to fetch data from the backend
export const getData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_data/`);
    const data = await response.json();
    // console.log('API response:', data);
    return data;
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};

