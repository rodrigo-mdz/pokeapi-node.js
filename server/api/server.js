const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//Luego se crea una instancia de express ,
//esta linea de codigo le dice al S.O que le envie todo lo que entre en el puerto 3000.
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED = 'seed-desarrollo';

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//configuracion global de rutas
 app.use(require('./routes/index'));

//app.use(express.static(__dirname ));
//Levanto el servidor
app.listen(app.get('port'), () => {
  console.log(`Listening over port: ${app.get('port')}`);
});
