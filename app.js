const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaLivros = require('./routes/livros');


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use((req, res, next) =>{
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-Header', 
        'Origin, X-Requested, Content-Type, Accept, Authorization'
    );
    
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/livros', rotaLivros);

app.use((req, res, next) =>{
    const erro = new Error ('deu ruim');
    erro.status = 404;
    next(erro);
});

app.use ((error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});

module.exports = app;