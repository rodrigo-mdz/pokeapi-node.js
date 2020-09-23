const express = require('express');
const router = express.Router();

const { verificaToken } = require('../middlewares/autentication')
const connectionDB = require('../connectionDB');

router.get('/team/getAll', verificaToken, (req, res) => {

  const user = req.user;
  const getTeam_query = `select pokemon from team where user = ${user.id_user};`;

  connectionDB.query(getTeam_query, (error, result) => {
    if (error) res.status(500).json(error);

    res.status(200).json(result);
  });
});

router.post('/team/addPokemon', verificaToken, (req, res) => {
  const user = req.user;
  const pokemon = req.body;
  const addPokemon_query = `insert into team values(${user.id_user}, ${pokemon.id});`;

  connectionDB.query(addPokemon_query, (error, result) => {
    if (error) res.status(500).json(error);

    res.status(201).json({
      ok: true,
      message: 'Se agrego el pokemon correctamente.'
    });

  });
});

router.delete('/team/deletePokemon/:id', verificaToken, (req, res) => {
  const user = req.user;
  const pokemon = req.params.id;
  const deletePokemon_query = `delete from team where user = ${user.id_user} and pokemon = ${pokemon};`;

  connectionDB.query(deletePokemon_query, (error, result) => {
    if (error) res.status(500).json(error);

    res.status(200).json({
      ok: true,
      message: 'Se elimino el pokemon del equipo.'
    });
  });

});

router.delete('/team/deleteTeam', verificaToken, (req, res) => {
  const user = req.user;
  const deleteTeam_query = `delete from team where user = ${user.id_user};`;

  connectionDB.query(deleteTeam_query, (error, result) => {
    if (error) res.status(500).json(error);

    res.status(200).json({
      ok: true,
      message: 'Se elimino el equipo correctamente.'
    });
  });

});


module.exports = router;