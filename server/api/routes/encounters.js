const express = require('express');
const router = express.Router();

const { verificaToken } = require('../middlewares/autentication')
const connectionDB = require('../connectionDB');

//Nuevo encuentro
router.post('/encounters/save', verificaToken, (req, res) => {
  const user = req.user;
  const encounter = req.body;
  const newEncounter_query = `insert into encounters values(${user.id_user},${encounter.id_oponent},'${encounter.result}','${encounter.team_winner}');`;

  connectionDB.query(newEncounter_query, (error, result) => {
    if (error) {
      res.status(500).json(error);
    }

    res.status(200).json(result);

  });

});

router.get('/encounters/list', verificaToken, (req,res) => {
  const user = req.user;
  const listEncounter_query = `SELECT users.id ,users.username, encounters.* FROM encounters INNER JOIN users ON (users.id = encounters.user_1);`;

  connectionDB.query(listEncounter_query, (error, result) => {
    if (error) {
      res.status(500).json(error);
    }

    res.status(200).json(result);

  });

})



//Obtener datos de los encuentros
/*
router.get('/encounters/getAll', verificaToken, (req, res) => {
  const user = req.user;
  const getEncounters_query = `select users.username , team.* , encounters.result from encounters inner join users on(encounters.user_2 = users.id) inner join team on(team.user = users.id) where user_1 = ${user.id_user};`;

  connectionDB.query(getEncounters_query, (error, result) => {
    if (error) res.status(500).json(error);

    const response = [];

    result.map(item => {
      const data = {
        oponent: {
          id: item.user,
          username: item.username
        },
        team_oponent: {
          pokemon_1: item.pokemon_1,
          pokemon_2: item.pokemon_2,
          pokemon_3: item.pokemon_3,
          pokemon_4: item.pokemon_4,
          pokemon_5: item.pokemon_5,
          pokemon_6: item.pokemon_6
        },
        result_encounter: item.result
      };

      response.push(data);
    });

    res.status(200).json(response);

  });
});
*/

module.exports = router;
