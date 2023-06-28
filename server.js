const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const userRoutes = require ('./routes/userRoutes')
const sportEventRoutes = require ('./routes/sportEventRoutes')
const loisirEventRoutes = require ('./routes/loisirEventRoutes')
const demandeRoutes = require ('./routes/demandeRoutes')
const cors = require('cors');

require('dotenv').config();


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.use('/api/user', userRoutes)
app.use('/api/sportevent', sportEventRoutes)
app.use('/api/loisirevent', loisirEventRoutes)
app.use('/api/demandes', demandeRoutes)

app.listen (process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
}) 
mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log(err))