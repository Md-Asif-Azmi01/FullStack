const express = require('express');
let app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
require('./connection/conn');
const userApi = require('./controller/user')
const taskApi = require('./controller/task')


// Middleware to parse JSON bodies
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cookieParser());

const multipleOri = ['https://fullstack-clint.onrender.com', 'http://localhost:5173']
app.use(cors(
 {
        origin: multipleOri,
        credentials: true,
    }
));

 

app.use('/api/v1', userApi);
app.use('/api/v1', taskApi);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(
        `Server is running on port ${port}`);
});
