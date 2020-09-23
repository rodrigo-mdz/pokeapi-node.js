const mysql = require('mysql');

const connectionDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokeapi'
});

//Conecto la api con la bd.
connectionDB.connect((error) => {
    if (error) throw error;
    console.log("Successfull connection!");
});

module.exports = connectionDB;
