const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.DB_PORT

const auth = require('./routes/auth');
const user =require('./routes/user');
const oportunidad = require('./routes/inversion');

const app = express();

app.use(bodyParser.json({
    extended : true,
    limit: '5mb'
}))


app.use(cors());

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/oportunidad', oportunidad)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((req, res, next) =>{
    res.status(404).json({
        "message" :'la api a la que te quieres conectar, no se encuentra'
    })
});

