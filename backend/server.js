const express = require('express');


const helmet = require("helmet");
const cors = require("cors");
const logger=require('morgan')

const processPrompt=require('./src/controller/langchain.controllers');
const createExpense=require('./src/controller/expense.controller')
const app = express();

app.set('trust proxy', true);

app.use(helmet())
app.use(cors(
    {
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
    }
))

app.use(logger('dev'))
app.use(express.json()); // Middleware for parsing JSON bodies from incoming requests
app.get('/', (req,res)=>{
    res.send('Hello from server')
})
app.post('/api/prompt',processPrompt);

app.post('/api/expense', createExpense);

//catch route not found
app.use(function (req, res, next) {
    const err = new Error('Route Not Found');
    err.status = 404;
    next(err);
});


//errrohandling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
        message: err.message,
        status: false,
        error: process.env.NODE_ENV !== 'production' ? err : {}
    });
});

const port = 5001||process.env.PORT;

app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});
