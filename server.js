const express = require('express');
const dotenv = require('dotenv');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require('./server/database/connection');
const { connect } = require('http2');

const app = express();

dotenv.config( { path: "config.env" } );
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan("tiny"));

//connect to mongoDB
connectDB();

//parse requests
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)})