const express = require('express');
const app = express();
const routesApp = require('./routes/routes.js');

const PORT = process.env.PORT || 5000;
app.use(express.json());


//routes//
app.use('/api', routesApp);



app.listen(PORT, ()=>{
    console.log("server is running");
})