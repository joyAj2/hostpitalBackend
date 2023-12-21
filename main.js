const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const Patient = require('./models/Patient.js');
const Vitals = require('./models/Vitals.js');
const Encounter = require('./models/Encounter.js');

const router = express.Router();

const app = express();
app.use(bodyParser.json()); // Add .json() to use JSON middleware

const uri = `mongodb+srv://${process.env.MONGODB_CONNECTION_USERNAME}:${process.env.MONGODB_CONNECTION_PASSWORD}@cluster0.tahptwm.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Post route for patients
router.post('/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save(); // Add parentheses to call the function
    res.status(201).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Post route for encounters
router.post('/encounters', async (req, res) => {
  try {
    const encounter = new Encounter(req.body);
    await encounter.save(); // Add parentheses to call the function
    res.status(201).send(encounter);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Post route for vitals
router.post('/vitals', async (req, res) => {
  try {
    const vitals = new Vitals(req.body);
    await vitals.save(); // Add parentheses to call the function
    res.status(201).send(vitals);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET route for patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET route for patients with id
router.get('/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id); // Add await here
    if (!patient) {
      return res.status(404).send({ error: 'Error, the specified patient does not exist' });
    }
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use('/api', router); // Mount the router under the '/api' path

app.listen(3000, () => {
  console.log('Server started at port 3000');
});
