const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const connectionDB = require('../connectionDB');

//Login
router.post('/login', (req, res) => {

  const info_user = req.body;
  const login_query = `select users.id , users.password , users.mail , users.username from users where users.mail = "${info_user.mail}";`;

  connectionDB.query(login_query, (error, result) => {
    if (error) res.status(500).json(error);

    //Verifico que el usuario existe en la BD
    if (!result[0]) res.status(400).json({
      error_message: "(Usuario) o contraseña incorrectos"
    });

    //Verifico que la contraseña coincida con la almacenada en la BD
    if (!bcrypt.compareSync(info_user.password, result[0].password)) res.status(400).json({
      error_message: "Usuario o (contraseña) incorrectos"
    });

    //Genero el token 
    const token = jwt.sign({
      user: {
        id_user: result[0].id,
        username: result[0].username,
        mail: result[0].mail
      }
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    //Devolver token
    res.status(200).json({
      ok: true,
      username: result[0].username,
      token
    });

  });

});

module.exports = router;