/*
SQLyog Ultimate v9.63 
MySQL - 5.5.5-10.1.21-MariaDB : Database - pokeapi
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pokeapi` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `pokeapi`;

/*Table structure for table `collection` */

DROP TABLE IF EXISTS `collection`;

CREATE TABLE `collection` (
  `pokemon` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  KEY `pokemon` (`pokemon`),
  KEY `user` (`user`),
  CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `encounters` */

DROP TABLE IF EXISTS `encounters`;

CREATE TABLE `encounters` (
  `user_1` int(11) NOT NULL,
  `user_2` int(11) NOT NULL,
  `winner` int(11) NOT NULL,
  `team_winner` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  KEY `user_1` (`user_1`),
  KEY `user_2` (`user_2`),
  CONSTRAINT `encounters_ibfk_1` FOREIGN KEY (`user_1`) REFERENCES `users` (`id`),
  CONSTRAINT `encounters_ibfk_2` FOREIGN KEY (`user_2`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `team` */

DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `user` int(11) NOT NULL,
  `pokemon` int(3) NOT NULL,
  KEY `user` (`user`),
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/* Procedure structure for procedure `checkPokemon` */

/*!50003 DROP PROCEDURE IF EXISTS  `checkPokemon` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `checkPokemon`(in pokemon_name varchar(200) , in pokemon_id int(11))
BEGIN
declare result int;
select exists (select * from pokemon where pokemon.name = pokemon_name) as exist into result;
if (result = 0) then 
insert into pokemon values(pokemon_id, pokemon_name);
select concat(pokemon.name , " se agrego a la colección.") as result from pokemon where pokemon.name = pokemon_name; 
else 
select concat(pokemon.name , " ya existe en la colección.") as result from pokemon where pokemon.name = pokemon_name; 
end if;
END */$$
DELIMITER ;

/* Procedure structure for procedure `savePokemonInCollection` */

/*!50003 DROP PROCEDURE IF EXISTS  `savePokemonInCollection` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `savePokemonInCollection`(in id_pokemon int, in name_pokemon varchar(100), in id_user int)
BEGIN
declare result int;

select exists( select * from pokemon where pokemon.id = id_pokemon ) as existe into result;

if (result = 0) then
insert into pokemon(id, name) values (id_pokemon , name_pokemon);
end if;

select count(pokemon) into result from collection where user = id_user and pokemon = id_pokemon;

if (result = 2) then
select concat("El usuario: " , id_user , " ya cuenta con " ,  result , " pokemon con el nombre: ", name_pokemon) as message;
end if;

if (result < 2) then
insert into collection values (id_pokemon , id_user);
end if;

END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
