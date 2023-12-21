// test-script.js

const axios = require('axios');

const baseURL = 'http://localhost:3000/api'; // Adjust the base URL based on your server setup

const patientData = {
  patientID: '12345',
  surname: 'Doe',
  otherNames: 'John',
  gender: 'Male',
  phoneNumber: '1234567890',
  residentialAddress: '123 Main Street',
  emergencyContact: {
    name: 'Emergency Contact',
    phone: '9876543210',
    relationship: 'Friend',
  },
};

const encounterData = {
  patientID: '5fbb3a7f767af08be4959c18', // Use an existing patient ID from your database
  type: 'OPD',
};

const vitalsData = {
  patientID: '5fbb3a7f767af08be4959c18', // Use an existing patient ID from your database
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
  },
  temperature: 98.6,
  pulse: 75,
  spO2: 98,
};

// Function to make a POST request
async function postData(endpoint, data) {
  try {
    const response = await axios.post(`${baseURL}/${endpoint}`, data);
    console.log(`POST ${endpoint}:`, response.data);
  } catch (error) {
    console.error(`Error making POST request to ${endpoint}:`, error.message);
  }
}

// Function to make a GET request
async function getData(endpoint) {
  try {
    const response = await axios.get(`${baseURL}/${endpoint}`);
    console.log(`GET ${endpoint}:`, response.data);
  } catch (error) {
    console.error(`Error making GET request to ${endpoint}:`, error.message);
  }
}

// Make test requests
postData('patients', patientData);
// postData('encounters', encounterData);
// postData('vitals', vitalsData);
// getData('patients');
// getData(`patients/${existingPatientId}`); // Replace existingPatientId with a valid patient ID from your database
