const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//insere
router.post ('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error})}
        conn.query(
            'INSERT INTO livros (titulo, autor, descric, preco, categ) VALUES (?,?,?,?,?)',
            [req.body.titulo, req.body.autor, req.body.descric, req.body.preco, req.body.categ],
            (error, result, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Menino livro inserido e nois familia',
                    livroInserido: {
                            id_livro: result.id_livros,
                            titulo: req.body.titulo,
                            autor: req.body.autor,
                            descricao:  req.body.descric,
                            preco: req.body.preco,
                            categoria: req.body.categ
                        }
                    }
                return res.status(200).send(response)
            }
        )
    });
});

//retorna *
router.get ('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM livros;',
            (error, result, fields) => {
                if (error) {return res.status(500).send({ error: error})}
                const response = {
                    quantidade: result.length,
                    livros: result.map(liv =>{
                        return {
                            id_livro: liv.id_livros,
                            titulo: liv.titulo,
                            autor: liv.autor,
                            descricao:  liv.descric,
                            preco: liv.preco,
                            categoria: liv.categ
                        }
                    })
                }
                return res.status(200).send({response: result})
            }
        )
    })
});


//retorna 1
router.get ('/:id_livros', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM livros WHERE id_livros = ?;',
            [req.params.id_livros],
            (error, result, fields) => {
                if (error) {return res.status(500).send({ error: error})}

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'O id inserido é invalido muyTriste.'
                    })
                }
                const response = {
                    livro: {
                        id_livro: result[0].id_livros,
                        titulo: result[0].titulo,
                        autor: result[0].autor,
                        descricao:  result[0].descric,
                        preco: result[0].preco,
                        categoria: result[0].categ
                    }
                }
                return res.status(200).send(response);
            }
        )
    });
});

//altera
router.patch('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error})}
        conn.query(
            `UPDATE livros 
                SET 
                    titulo = ?,
                    autor = ?,
                    descric = ?,
                    preco = ?,
                    categ = ?
                WHERE id_livros = ?`,            
            [
                req.body.titulo, 
                req.body.autor, 
                req.body.descric, 
                req.body.preco,
                req.body.categ, 
                req.body.id_livros
            ],
            (error, result, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error})}

                res.status(202).send ({
                    mensagem: 'Alterado o menino livro com tranquilidade'
                });
            }
        )
    });
});

//delete
router.delete('/', (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error})}
        conn.query(
            'DELETE FROM livros WHERE id_livros = ?',            
            [req.body.id_livros],
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error})}

                res.status(201).send ({
                    mensagem: 'deletado o menino livro com success'
                });
            }
        )
    });
});

module.exports = router;

