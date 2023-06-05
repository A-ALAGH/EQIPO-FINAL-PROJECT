const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const userRoutes = require ('./routes/userRoutes')
const sportEventRoutes = require ('./routes/sportEventRoutes')
const loisirEventRoutes = require ('./routes/loisirEventRoutes')
require('dotenv').config({path:'./config/.env'});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/user', userRoutes)
app.use('/api/sportevent', sportEventRoutes)
app.use('/api/loisirevent', loisirEventRoutes)

app.listen (process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
}) 
mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log(err))