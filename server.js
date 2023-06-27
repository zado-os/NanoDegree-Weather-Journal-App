const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Middleware
app.use(express.static('website'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/projectData', (req, res) => {
  res.status(200).send(projectData);
});

app.post('/projectData', (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  };
  console.log(projectData);
  res.status(200).json({
    success: true,
    message: "Data saved successfully",
    data: projectData
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
