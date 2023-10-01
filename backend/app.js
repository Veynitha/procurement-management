//Imports
const express = require('express');
const supplyRoutes = require('./src/routes/supplyOrderRoutes')
const {db} = require('./src/database/connection');

require('dotenv').config()

//Constants
const app = express();
const Port = process.env.PORT_NO;


//middlewares
app.use(express.json());

//Routes
app.use('/api', supplyRoutes)

app.listen(Port, () => {
    db()
    console.log(`Server is Running on port ${Port}`)
});

