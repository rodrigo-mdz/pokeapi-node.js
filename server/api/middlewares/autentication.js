const jwt = require('jsonwebtoken');

//Verificar Token
const verificaToken = (req, res, next) => {

  let token = req.get('Authorization');

  //Comprobar que el token es valido
  if (token) {
    //Eliminar 'Bearer' del token
    token = token.slice(7, token.length);

    jwt.verify(token, process.env.SEED, (error, decoded) => {//decoded es el payload , donde esta la info del usuario.

      if (error) {
        res.status(401).json({
          ok: false,
          message: 'Token no válido.'
        });
      }

      req.user = decoded.user;
      next();

    });
  }
}

module.exports = { verificaToken }
