// basic import

const express = require('express');
const app = new express();

const router = require('./src/Routes/Api')

//middleware import
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');

// rate limit implement

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Disable the `X-RateLimit-*` headers
})

// middleware implement 

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xssClean());
// app.use(limiter);

// mongodb connections membership123

const mongoose = require('mongoose')

const URI = "mongodb+srv://membership:membership123@cluster0.ezexp.mongodb.net/tunicalabsMedia?retryWrites=true&w=majority";
const OPTION = { user: '', pass: '', autoIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(URI, { useNewUrlParser: true }, OPTION, (error) => {
    console.log("object");
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongodb connection successful");
    }
})


app.use('/api/v1', router);

// undefine route
app.use('/', (req, res) => {
    res.status(200).json({ status: 'running server' })
})
app.use('*', (req, res) => {
    res.status(404).json({ status: 'fail', data: "Not Found" })
})

module.exports = app;