// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
const books = require('./routes/api/books');
const users = require('./routes/api/users');
const cart = require('./routes/api/cart');



// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);
app.use('/api/users', users);
app.use('/api/cart', cart);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));