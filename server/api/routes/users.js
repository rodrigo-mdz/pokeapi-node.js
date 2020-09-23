const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { verificaToken } = require('../middlewares/autentication')
const connectionDB = require('../connectionDB');

router.post('/user/create', (req, res) => {

  const user = req.body;
  const createUser_query = `insert into users values (null, '${user.username}','${user.mail}','${bcrypt.hashSync(user.password, 10)}');`;

  connectionDB.query(createUser_query, (error, result) => {
    if (error) res.status(500).json(error);

    res.status(201).json({
      ok: true,
      message: 'Se creó un nuevo usuario.'
    });

  });
});

router.get('/user/getAll', (req, res) => {

  const getUsers_query = 'SELECT users.username , users.mail, GROUP_CONCAT(team.`pokemon`) AS team FROM users INNER JOIN team ON(team.user = users.id ) GROUP BY username;';

  connectionDB.query(getUsers_query, (error, result) => {
    if (error) res.status(400).json(error);

    const response = [];
    result.map(data => {
      const user = {
        username: data.username,
        mail: data.mail,
        team: data.team.split(',')
      }

      response.push(user);
    });

    res.status(200).json(response);
  });
});

router.get('/user/getSelection', verificaToken, (req, res) => {

  const user = req.user;
  const getOneUser_query = `SELECT users.id ,users.username , GROUP_CONCAT(team.pokemon) AS team FROM users INNER JOIN team ON(team.user = users.id) WHERE users.id != ${user.id_user} GROUP BY username;`;

  connectionDB.query(getOneUser_query, (error, result) => {
    if (error) res.status(400).json(error);

    const response = [];
    
    result.map(data => {
      const user = {
        id: data.id,
        username: data.username,
        team: data.team.split(',')
      }

      response.push(user);
    });

    res.status(200).json(response);
  });

});

router.put('/user/edit', verificaToken, (req, res) => {

  const user = req.user;
  const edited_user = req.body;
  const editUser_query = `update users set name = '${edited_user.name}', lastname = '${edited_user.lastname}', mail = '${edited_user.mail}', username = '${edited_user.username}', password = '${edited_user.password}' where id = ${user.id_user};`;
  const listUser_query = `select users.username from users where id = ${user.id_user};`;

  connectionDB.query(editUser_query, (error, result) => {
    if (error) res.status(500).json(error);

    connectionDB.query(listUser_query, (error, result) => {
      if (error) res.status(500).json(error);

      res.status(200).json(result);
    });

  });
});

router.delete('/user/delete', verificaToken, (req, res) => {

  const user = req.user;
  const deleteUser_query = `delete from users where users.id = ${user.id_user}`;

  connectionDB.query(deleteUser_query, (error, result) => {
    if (error) res.status(500).json(error);

    res.status(204);
  });
});

module.exports = router;
