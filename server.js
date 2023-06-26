const projectData = {
};

const express = require('express');

const app = express();

// parse json req and res & Extended for form
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// where the files to run the project
app.use(express.static("static"));