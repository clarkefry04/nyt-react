const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/nytreact'

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});