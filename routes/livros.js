const express = require('express');
const router = express.Router();

//insere
router.post ('/', (req, res, next) =>{
    
    const livro = {
        nome: req.body.nome,
        ano: req.body.ano
    };
    
    res.status(201).send({
        mensagem: 'insere',
        livroCriado: livro
    });
});

//retorna *
router.get ('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'retorna all *'
    });
});

//retorna 1
router.get ('/:id_livro', (req, res, next) =>{
    const id = req.params.id_livro;

    if(id === 'a'){
        res.status(200).send({
            mensagem: 'retorna por id sendo id igual a A',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: 'id dif d A'
        });
    }
});

//altera
router.post ('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'altera'
    });
});

//delete
router.post ('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'deleta'
    });
});

module.exports = router;