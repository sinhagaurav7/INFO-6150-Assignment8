const express = require('express');
const userRouter = require('./routes/users');
const User = require('./models/user');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/assignment8');  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Successfully connected to the database');
});

app.listen(3000, () => {
    console.log('Server is running on the port: 3000');
});

app.use(express.json());
app.use('/', userRouter);