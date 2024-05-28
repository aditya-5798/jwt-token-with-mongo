const express = require('express');
const app = express();
require('express-async-errors');
const routeNotFound = require('../src/middlewares/routeNotFound');
const loginRouter = require('./routes/loginwithAuthRoute');

//middlewares
app.use(express.json())
app.use('/api/v1', loginRouter)
app.use(express.static('./public'));
app.use(routeNotFound)


const port = process.env.PORT || 4000;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();