const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bp = require('body-parser');
const morgan = require('morgan');
app.use(bp.json()); 

mongoose.connect(process.env.MONGO_DBSTRING, { useNewUrlParser: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

const User = require('./models/User');

const paytmHandler = require('./handlers/paytmHandler');
const usersHandler = require('./handlers/usersHandler');

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});  

app.use('/paytm', paytmHandler);
app.use('/users', usersHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));