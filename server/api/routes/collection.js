const express = require('express');
const router = express.Router();

const { verificaToken } = require('../middlewares/autentication')
const connectionDB = require('../connectionDB');

router.get('/collection/getAll', verificaToken, (req, res) => {
  const user = req.user.id_user;
  const getMyCollection_query = `select pokemon from collection where user = ${user};`;

  connectionDB.query(getMyCollection_query, (error, result) => {
    if (error) res.status(500).json(error);

    res.status(200).json(result);

  });
});

router.post('/collection/addPokemon', verificaToken, (req, res) => {
  const pokemon = req.body;
  const user = req.user.id_user;
  const addPokemon_query = `insert into collection values(${pokemon.id}, ${user});`;

  connectionDB.query(addPokemon_query, (error, result) => {
    if (error) res.status(500).json(error);

    res.status(201).json({
      ok: true,
      message: 'Se agregó el pokemon a la colección.'
    });

  });
});

router.delete('/collection/deletePokemon/:id', verificaToken, (req, res) => {
  const user = req.user.id_user;
  const pokemon = req.params.id;
  const deletePokemon_query = `delete from collection where pokemon = '${pokemon}' and user = ${user} limit 1;`;

  connectionDB.query(deletePokemon_query, (error, result) => {
    if (error) res.status(500).json(error)
  });

  res.status(200).json({
    ok: true,
    message: "Se elimino el pokemon de la colección."
  });

});

router.delete('/collection/deleteAllPokemon', verificaToken, (req, res) => {

  const user = req.user;
  const deleteAllPokemon_query = `delete from collection where user = ${user.id_user};`;

  connectionDB.query(deleteAllPokemon_query, (error, result) => {
    if (error) res.status(500).json(error);
  });

  res.status(200).json({
    ok: true,
    message: "Se elimino la colección completa."
  });

});


module.exports = router;
