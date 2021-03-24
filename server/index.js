require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const user = require('../routes/user');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(() => console.log('Connected to MongoDB...'));

app.use(express.json());
app.use('/api/users', user);

app.use(express.static(path.join(__dirname + '/../client/dist')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));