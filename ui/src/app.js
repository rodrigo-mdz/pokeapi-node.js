//Elementos del DOM que seran modificados en multiples funciones.
const inputName = document.querySelector("#pokemonName");
const listPokemons = document.querySelector("#listPokemon");
const modal_login = document.querySelector("#modal_ingresar");
const modal_register = document.querySelector("#modal_registro");
const myPokemon = document.querySelector("#myPokemon");

//Url apis
const url_API = "http://localhost:3000";
const url_POKE_API = "https://pokeapi.co/api/v2/pokemon/";

//lanzar mensaje de error perzonalido.
const handleError = () => {
  listPokemons.innerHTML = `
    <div class="row">
    <div class="col-lg-7 mx-auto pt-4">
    <div class="jumbotron alert alert-danger text-center pt-2 pl-1 pr-1 pb-0 mb-0 border-danger">
    <img class="m-0 rounded-circle img-thumbnail border-danger" style="width: 30%;" src="styles/images/pokedex.gif">
    <h3 class=""><strong><em>Error: Not found!</em></strong></h3>
    <hr class="my-2">
    <p class="small">The pokemon "${inputName.value}" <strong>was not found !</strong> , please enter a new.</p>
    </div>
    </div>
    </div>`;
}

// buscar un pokemon en la api
const getPokemonData = data => {
  try {
    return axios.get(url_POKE_API + data)
      .then(response => response.data)
      .catch(error => console.log(error))
  } catch (error) {
    throw "Se rompio. Error: ", error;
  }
}

//limpiar contenido de cualquier elemento 
const clearList = (element) => element.innerHTML = "";

// reemplazar gif por imagen.
const getImage = (url, imgElement) => imgElement.src = url;

//cambiar imagen del boton guardar (pokeball). 
const changeImgButton = (button) => button.firstChild.nextSibling.src = 'styles/images/pokeball-2.png';

const addClassToCard = (element) => {
  element.classList.remove('shadow');
  element.classList.add('shadow-lg');
  element.classList.add('border-secondary');
}

const removeClassToCard = (element) => {
  element.classList.remove('shadow-lg');
  element.classList.add('shadow');
  element.classList.remove('border-secondary');
}

const addBorder = (element) => element.classList.add('border-secondary');

const removeBorder = (element) => element.classList.remove('border-secondary');

const showAllPokemon = (arrayPokemon, element) => {

  clearList(element);
  const pokemonHTML = arrayPokemon.map(data => element.innerHTML =
    `<div class="card mb-2 ml-2 mr-2 mt-1 shadow d-inline-block" onmouseover="addClassToCard(this)" onmouseout="removeClassToCard(this)" style="max-width: 9rem;">
    <div class="card-header small pt-1 pb-1">
    <p class="mb-0 text-dark"><strong><em>${data.name.charAt(0).toUpperCase() + data.name.slice(1, data.name.length > 7 && data.name.indexOf("-") > 0 ? data.name.indexOf("-") : data.name.length)}</em></strong></p>
    </div>
    <div class="card-body container-card mt-1 mb-1 text-center pl-1 pr-1">
        <figure class="figure card-img m-0">
        <img src="styles/images/pokemon.gif" class="card-img w-50" id="imagePokemon${data.id}" onload="getImage('https://www.cpokemon.com/pokes/shuffle/${data.id}.png',this)">
        </figure>
        <button class="btn btn-light text-secondary border shadow-sm rounded-circle btn-sm pl-0 pr-0 pt-0 pb-0" onclick="statsProgressBar(${data.id})" data-toggle="modal" data-target="#pokemon${data.id}">
        <svg class="bi bi-list" width="21px" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M4.5 13.5A.5.5 0 015 13h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 9h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-4A.5.5 0 015 5h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
        </svg>
        </button>
    </div>
    <div class="card-footer pt-0 pb-0 text-dark pl-1 pr-1 pb-1">
    <button class="btn btn-sm btn-light text-secondary rounded-pill border pt-0 pb-0 pr-1 pl-1 small mb-0 mr-5 shadow-sm" data-pokemon="${data.id}" onclick="savePokemon(this)" disabled>
    <img src="styles/images/pokeball-abierto-48.png" class="mr-1" style="width: 17px;">save
    </button>
    <p class="mb-0 ml-0 text-right text-secondary d-inline-block small shadow-sm rounded border-bottom"><em>${('00' + data.id).slice(-3)}</em></p>
    </div>
  </div>
    
  <!--inicio modal pokemon -->
  <div class="modal fade" id="pokemon${data.id}" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
  <div class="modal-content">
  <div class="card-header">
  <div class="row">
  <div class="col-lg-5 text-center text-dark">
  <figure class="figure card-img w-100">
  <img src="styles/images/pokemon-cámara-96.png" class="mb-1" style="width: 23%;">
  <img src="https://www.cpokemon.com/pokes/anime/${data.id}.png" class="figure-img img-fluid img-thumbnail rounded-lg p-1 shadow" alt="">
  </figure>
  </div>
  <div class="col-lg-7 border-left">
  <h5 class="mb-0 mr-4 d-inline-block mt-4"><strong><em>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</em></strong></h5>
  <p class="text-right text-dark ml-1 mb-0 mt-4 border-left pl-2 d-inline-block"><strong><em>n° ${data.id}</em></strong></p>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  <ul class="font-size-small list-group text-left mt-3 shadow-sm">
  <li class="list-group-item pt-1 pb-1"><b><em>Type :</em></b> ${data.types.map(item => item.type.name).reverse().join(" , ")}.</li>
  <li class="list-group-item pt-1 pb-1"><b><em>Weight :</em></b> ${data.weight} .</li>
  <li class="list-group-item pt-1 pb-1"><b><em>Height :</em></b> ${data.height} .</li>
  <li class="list-group-item pt-1 pb-1"><b><em>Abilities :</em></b> ${data.abilities.map(item => item.ability.name).join(" , ")}.</li>
  </ul>

  </div>
  </div>
  </div>
  <div class="card-body pt-1">
  <div class="container text-center">
  <h6 class="d-inline-block pb-1">Stats</h6>
  <svg class="bi bi-graph-up" width="25" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 2h1v16H2V2zm1 15h15v1H3v-1z"/>
  <path fill-rule="evenodd" d="M16.39 6.312l-4.349 5.437L9 8.707l-3.646 3.647-.708-.708L9 7.293l2.959 2.958 3.65-4.563.781.624z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M12 5.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V6h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
  </svg>
  </div>
  <ul class=" list-group shadow-sm">
  ${data.stats.map(item => `
  <li class="list-group-item pt-1 pb-1">
  <div class="form-group row mb-1">
  <div class="col-lg-4 small text-center"><strong><em>${item.stat.name.toUpperCase() + " :"}</em></strong></div>
  <div class="col-lg-8">
  <div class="progress mt-1">
  <div class="progress-bar ${item.stat.name == "hp" ? `bg-success` : ``} 
  ${item.stat.name == "defense" || item.stat.name == "attack" || item.stat.name == "speed" ? `bg-info` : ``}
  ${item.stat.name == "special-attack" || item.stat.name == "special-defense" ? `progress-bar-striped progress-bar-animated bg-info` : ``}
  " style="width: 0%;" role="progressbar" data-value="${item.base_stat}" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  </div>
  </div>
  </li>
  `).reverse().join(" ")}
  </ul>
  </div>
  </div>
  </div>
  </div>`).join(" ");

  element.innerHTML = pokemonHTML;

  verifyLocationPath();
};

const verifyLocationPath = () => {
  const path = location.pathname;
  if (path != '/' && path != '/home') enableCheckbox();
  else if (path === '/home') userGreeting();
}

// cargar barra de progreso con las estadisticas del pokemon.
const statsProgressBar = (id_pokemon) => {
  const statsBar = document.getElementById(`pokemon${id_pokemon}`);
  const stats_value = Array.from(statsBar.getElementsByClassName("progress-bar"))

  stats_value.map(item => {
    item.style = "width: 0%;";
    item.textContent = "0";
    item.attributes[4].value = "0";
    const stat = parseInt(item.dataset.value);

    setTimeout(() => {
      for (let i = 0; i <= stat; i++) {
        item.style = `width: ${i}%;`;
        item.textContent = `${i}`;
        item.attributes[4].value = `${i}`;
      }

    }, 500);
  })

}

const showPokemonToOnClickLink = () => {
  const elementActive = document.querySelector("div.btn-group.btn-group-sm button[class='btn btn-light active']");
  const generation = parseInt(elementActive.textContent);
  getPokemonByGeneration(generation, elementActive);
}

let x = 1,
  z = 100,
  begin,
  end;

const pokemon = []; //Array con todos los pokemon obtenidos de la pokeApi.

//listar los pokemon.
const listPokemon = async () => {
  begin = x,
    end = z;
  const pokemon_exists = pokemon.some(item => item.id === x);//verifica el array pokemon ,devuelve true o false.

  for (; x <= z; x++) {
    if (!pokemon_exists) { //Si el pokemon no existe en el array lo busca en la pokeapi.
      const infoPokemon = await getPokemonData(x);
      pokemon.push(infoPokemon);
    }

    mainProgressBar();
  }

  hideProgressBar();
  //Filtro los pokemon para mostrarlos por generaciones. 
  const pokemonByGeneration = pokemon.filter(item => item.id >= begin && item.id <= end);
  showAllPokemon(pokemonByGeneration, listPokemons);
}

//listar pokemon por generacion
const getPokemonByGeneration = (generation, element) => {
  switch (generation) {
    case 1: x = 1, z = 151;
      break;

    case 2: x = 152, z = 251;
      break;

    case 3: x = 252, z = 386;
      break;

    case 4: x = 387, z = 493;
      break;

    case 5: x = 494, z = 649;
      break;

    case 6: x = 650, z = 719;
      break;

    default:
      break;
  }

  clearList(listPokemons);
  listPokemon();
  buttonActive(element);
}

// buscar pokemons dentro del array pokemon[].
const findPokemon = () => {
  const results = pokemon.filter(item => item.name.startsWith(inputName.value.toLowerCase()) && item.id >= begin && item.id <= end);

  if (results.length === 0) handleError();
  else {
    showAllPokemon(results, listPokemons);
    if (location.pathname === '/collection') checkPokemonCards(collection);
    if (location.pathname === '/encounters') checkPokemonCards(team);
  };
}

//cargar barra de progreso principal al ingresar a la pagina.
const mainProgressBar = () => {
  const DivProgressBar = document.querySelector('#rowProgressBar');
  const progress_bar = document.querySelector(".progress-bar");
  const progress_number = document.querySelector("#progressNumber");

  DivProgressBar.removeAttribute('hidden');
  const progress = parseInt((x * 100) / z);
  progress_bar.style = `width: ${progress}%;`;
  progress_number.textContent = `${progress}%`;
}

const hideProgressBar = () => {
  const DivProgressBar = document.querySelector('#rowProgressBar');
  DivProgressBar.setAttribute('hidden', '');
}

//login User(sign in)
const loginUser = (evt) => {
  evt.preventDefault();
  const mail = document.querySelector("#mail").value;
  const password = document.querySelector("#password").value;
  const data = {
    mail: mail,
    password: password
  };

  axios.post(`${url_API}/login`, data)
    .then(resp => {
      localStorage.setItem('token', resp.data.token);
      window.location.replace('/collection');
    });

}

//create user(sign up)
const createUser = (evt) => {
  evt.preventDefault();
  const username = document.querySelector('#new_username').value;
  const mail = document.querySelector('#new_mail').value;
  const password = document.querySelector('#new_password').value;
  const data = {
    username: username,
    mail: mail,
    password: password
  };
  const data_login = {
    mail: mail,
    password: password
  }

  axios.post(`${url_API}/user/create`, data)
    .then(resp => {
      console.log(resp.data);

      axios.post(`${url_API}/login`, data_login)
        .then(resp => {
          localStorage.setItem('token', resp.data.token);
          location.replace('/collection');
        })
    });

}

//decodificar token
const parseJwt = () => {
  try {
    const token = localStorage.getItem('token');
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return e;
  }
};

//colocar nombre de usuario en btn-menu-user
const menuUser = () => {
  const token = parseJwt();
  const btn_menu_user = document.querySelector('#btn-menu-user');
  btn_menu_user.firstElementChild.insertAdjacentHTML('afterend', token.user.username);
}

//user: saludar usuario
const userGreeting = () => {
  const token = parseJwt();

  const greet = `<div class="container col-lg-7 mt-3 mx-auto" id="greet-user">
      <div class="alert alert-primary alert-dismissible fade show shadow text-center pb-2" role="alert">
        <img src="styles/images/pokeball-alert-login.png" class="mb-1" style="width: 24px;">
        <strong><h5 class="m-0 p-0 d-inline-block">¡ Welcome <span class="text-info">${token.user.username}</span> !</h5></strong>
        <button type="button" class="close small" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>`;

  listPokemons.insertAdjacentHTML('beforebegin', greet);

  setTimeout(() => {
    const greetDiv = document.querySelector("#greet-user");
    greetDiv.innerHTML = '';
  }, 4000);

}

const enableCheckbox = () => {
  const pokemonCards = Array.from(document.querySelectorAll(".card-footer.pt-0.pb-0.text-dark.pl-1.pr-1.pb-1"));
  pokemonCards.map(item => item.firstChild.nextSibling.removeAttribute('disabled'));
}

//guardo el equipo de pokemon en un array.
const team = [];

//funcion para cargar la vista de team.html 
const loadTeamPage = async () => {
  await listPokemon();
  const team_pokemon = await getTeam();
  team_pokemon.map(item => team.push(item.pokemon));

  showTeam();
  getSelection();
  checkPokemonCards(team);
  enableCheckbox();
}

const getTeam = () => {
  const config = configHeaders();
  return axios.get(`${url_API}/team/getAll`, config)
    .then(resp => resp.data);
}

const showTeam = () => {
  const div_pokemon_container = document.querySelector("#container-of-my-pokemon");
  clearList(div_pokemon_container);
  teamHTML = `${team.map(item => pastePokemonCard(item)).join('')}`;
  div_pokemon_container.innerHTML = teamHTML;

  countPokemon();
}

const removeFromTeam = (button) => {
  const pokemon = button.dataset.pokemon;
  const card_pokemon = document.querySelector(`#collection-card-${pokemon}`);
  const config = configHeaders();
  //busco y elimino el pokemon del array team[] y del DOM.
  const i = team.findIndex(item => item === parseInt(pokemon));
  team.splice(i, 1);
  checkPokemonCards(team);
  card_pokemon.remove();

  axios.delete(`${url_API}/team/deletePokemon/${pokemon}`, config)
    .then(resp => {
      console.log(resp.data);

      countPokemon();
    });
}

const saveToTeam = (button_save) => {
  const pokemon = button_save.dataset.pokemon;
  const result_team = findPokemonInArray(team, pokemon);
  const data = { id: pokemon };
  const config = configHeaders();

  if (team.length === 6) alert('ERROR: cannot save! Sorry , you can only save 6 Pokemon in the team.');
  else if (result_team.length > 1) throwErrorMessage(pokemon);
  else if (result_team.length < 2 && team.length < 6) {
    team.push(parseInt(pokemon))//Guardo el pokemon en el array team[]

    axios.post(`${url_API}/team/addPokemon`, data, config)
      .then(resp => {
        console.log(resp.data);
        const pokemon_card = pastePokemonCard(pokemon);
        showInTheContainerPokemon(pokemon_card);

        countPokemon();
      })
  }

  checkPokemonCards(team);
}

//mostrar cantidad de pokemon en el team.
const countPokemon = () => {
  const pokemons = document.querySelector('#container-of-my-pokemon');
  const div_total = document.querySelector('#count-team');
  div_total.innerHTML = `${pokemons.childElementCount}/6`;
}

//verifico la url para ejecutar funcion correspondiente.
const savePokemon = (element) => {
  if (location.pathname === '/collection') saveToCollection(element);
  if (location.pathname === '/encounters') saveToTeam(element);
}

//mala practica: ejecuto la funcion correspondiente segun el path de la pagina.
const removePokemon = (element) => {
  if (location.pathname === '/collection') removeFromCollection(element);
  if (location.pathname === '/encounters') removeFromTeam(element);
}

//funcion que retorna objeto de configuracion de los headers.
const configHeaders = () => {
  return {
    'headers': {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }
};

//guardo la coleccion de pokemon en un array
const collection = [];

//funcion de carga la vista collection.html
const loadCollectionPage = async () => {
  await listPokemon();
  const collection_pokemon = await getCollection();
  collection_pokemon.map(item => collection.push(item.pokemon));

  showCollection();
  checkPokemonCards(collection);
  enableCheckbox();

  listEncounters();
}

//
const listEncounters = () => {

  const config = configHeaders();

  axios.get(`${url_API}/encounters/list`, config)
    .then(resp => showEncounters(resp.data))

}

const showEncounters = (data) => {
  
  const div_container = document.querySelector('.col-lg-4.mt-3.p-0.mx-auto');
  const table_html = `<table class="col-lg-11 mx-auto mt-3 table table-sm table-hover table-sm text-center shadow small">
  <thead class="text-dark">
    <tr>
      <th>Username</th>
      <th>id_winner</th>
      <th>Team_winner</th>
      <th>id_oponent</th>
    </tr>
  </thead>
  <tbody class="text-center text-secondary bg-light">
    ${data.map(user => `
  <tr>
  <td class="">${user.username}</td>
  <td>${user.winner}</td>
  <td>${user.team_winner}</td>
  <td>${user.user_2}</td>
  </tr>`).join(' ')}
  </tbody>
  </table>`;

  div_container.insertAdjacentHTML('beforeend', table_html);
}

//mi coleccion: obtener coleccion del backend.
const getCollection = async () => {
  const config = configHeaders();
  return axios.get(`${url_API}/collection/getAll`, config)
    .then(resp => resp.data)
}

//los pokemons almacenados en la collection o equipo se muestran guardados.
const checkPokemonCards = (array) => {
  const cards_pokemon = Array.from(document.querySelectorAll('.card-footer.pt-0.pb-0.text-dark.pl-1.pr-1.pb-1'));

  cards_pokemon.map(item => {
    const data_pokemon = item.firstChild.nextSibling.dataset.pokemon;
    const imgButton = item.firstChild.nextSibling.firstChild.nextSibling;
    const exists = array.find(item => item === parseInt(data_pokemon));
    if (exists) imgButton.src = 'styles/images/pokeball-2.png';
    if (!exists) imgButton.src = 'styles/images/pokeball-abierto-48.png';
  })

}

//Mi coleccion: mostrar coleccion .
const showCollection = () => {
  const div_pokemon_container = document.querySelector("#container-of-my-pokemon");
  clearList(div_pokemon_container);
  collectionHTML = `${collection.map(item => pastePokemonCard(item)).join('')}`;
  div_pokemon_container.innerHTML = collectionHTML;
}

//mi coleccion: mostrar pokemon en la coleccion o el equipo.
const pastePokemonCard = (pokemon) => {
  return `<div class="card mt-0 mb-0 mr-1 ml-1 shadow-sm d-inline-block rounded-lg" onmouseout="removeBorder(this)"
  onmouseover="addBorder(this)" id="collection-card-${pokemon}" style="max-width: 4rem; max-height: 98px;">
  <div class="card-body container-card mt-1 mb-0 text-center pt-1 pb-1 pl-1 pr-1">
    <figure class="figure card-img mb-1">
      <img src="https://www.cpokemon.com/pokes/anime/${pokemon}.png" onclick="statsProgressBar(${pokemon})" data-toggle="modal" data-target="#pokemon${pokemon}" class="card-img img-thumbnail rounded-circle shadow-sm" style="cursor: pointer;" alt="">
    </figure>
    <button class="btn btn-light border text-secondary btn-sm p-0" data-pokemon="${pokemon}" onclick="removePokemon(this)">
    <svg class="bi bi-trash" width="19px" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 7.5A.5.5 0 018 8v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V8z"/>
      <path fill-rule="evenodd" d="M16.5 5a1 1 0 01-1 1H15v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6h-.5a1 1 0 01-1-1V4a1 1 0 011-1H8a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM6.118 6L6 6.059V15a1 1 0 001 1h6a1 1 0 001-1V6.059L13.882 6H6.118zM4.5 5V4h11v1h-11z" clip-rule="evenodd"/>
    </svg>
    </button>
  </div>
</div>`;
}

//mi coleccion: lanzar error personalizado al intentar guardar por 3ra vez un mismo pokemon.
const throwErrorMessage = (id_pokemon) => {
  const messageDiv = document.querySelector('#error-message-user');
  if (messageDiv) messageDiv.remove();

  const token = parseJwt();
  const pokemon_name = pokemon.find(item => item.id == parseInt(id_pokemon)).name;
  const message = `<div class="container col-lg-11 mt-3 mb-5 mx-auto p-0" id="error-message-user">
      <div class="alert alert-danger alert-dismissible fade show shadow-lg text-center p-0 m-0" role="alert">
      <button type="button" class="close mt-0 mb-5 pt-0 pb-5 pl-4 pr-1" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true" class="mb-5 mt-0">&times;</span>
      </button>
      <svg class="bi bi-alert-circle text-danger mb-1" width="20px" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd"/>
      <path d="M9.002 13a1 1 0 112 0 1 1 0 01-2 0zM9.1 6.995a.905.905 0 111.8 0l-.35 3.507a.553.553 0 01-1.1 0L9.1 6.995z"/>
      </svg>
      <h6 class="d-inline-block m-0">Error: <span class="small">cannot save.</span></h6>
      <hr class="mt-1 mb-0">
        <p class="m-0 pb-2 d-inline-block small"><strong>${token.user.username}</strong> you can only save the pokemon: "${pokemon_name}" twice.</p>
        </div>
    </div>`;

  myPokemon.insertAdjacentHTML('afterend', message);
}

//mi coleccion: revisar array collection[], solo se pueden guardar 2 veces un mismo pokemon.
const findPokemonInArray = (array, pokemon) => array.filter(item => item === parseInt(pokemon));

//mi coleccion: guardar pokemon dentro de la coleccion.
const saveToCollection = (button_save) => {
  const pokemon = button_save.dataset.pokemon;
  const result_collection = findPokemonInArray(collection, pokemon);
  const data = { id: pokemon };
  const config = configHeaders();

  collection.push(parseInt(pokemon)); //Guardo el pokemon en el array collection[].

  if (result_collection.length > 1) throwErrorMessage(pokemon);
  else if (result_collection.length < 2) axios.post(`${url_API}/collection/addPokemon`, data, config)
    .then(resp => {
      console.log(resp.data);
      const pokemon_card = pastePokemonCard(pokemon);
      showInTheContainerPokemon(pokemon_card);

    })
  checkPokemonCards(collection);

}

//mi coleccion : mostrar pokemmon dentro de la coleciion despues de guardarlo en la bd.
const showInTheContainerPokemon = (pokemon_card) => {
  const pokemon_container = document.querySelector("#container-of-my-pokemon");

  if (pokemon_container.lastChild != null) {
    pokemon_container.lastChild.insertAdjacentHTML('afterend', pokemon_card);
  } else {
    pokemon_container.innerHTML = pokemon_card;
  }

  pokemon_container.scroll(0, 700);
}

//mi coleccion: eliminar pokemon de la coleccion.
const removeFromCollection = (button) => {
  const pokemon = button.dataset.pokemon;
  const card_pokemon = document.querySelector(`#collection-card-${pokemon}`);
  const config = configHeaders();
  //busco y elimino el pokemon del array collection[] y del DOM.
  const i = collection.findIndex(item => item === parseInt(pokemon));
  collection.splice(i, 1);
  checkPokemonCards(collection);
  card_pokemon.remove();

  axios.delete(`${url_API}/collection/deletePokemon/${pokemon}`, config)
    .then(resp => console.log(resp.data));

}

//user: cerrar sesion(sign off).
//Al Eliminar token del localStorage la pagina es redirigida a la pagina principal.
const signOff = () => localStorage.removeItem('token');

//mostrar modal de encuentros. 
const showModal = () => {
  const body = document.querySelector("#body");
  const modal = document.querySelector("#modal-of-encounters");

  body.classList.add('modal-open');
  modal.classList.add('show');
  modal.style = 'display: block;';
  element = '<div class="modal-backdrop fade show"></div>';
  body.insertAdjacentHTML('beforeend', element);
}

const hideModal = () => {
  const body = document.querySelector("#body");
  const modal = document.querySelector("#modal-of-encounters");
  const modal_back = document.querySelector(".modal-backdrop");

  body.classList.remove('modal-open');
  modal.classList.remove('show');
  modal.style = 'display: none;';
  modal_back.remove();
}

//obtener todos los usuarios.
const getUsers = () => {
  axios.get(url_API + '/user/getAll')
    .then(res => showUsers(res.data));
}

//mostrar todos los usuarios
const showUsers = (users) => {
  clearList(listPokemons);

  listPokemons.innerHTML = `
  <table class="col-lg-11 mx-auto mt-3 table table-sm table-hover table-sm text-center shadow small">
          <thead class="text-dark">
            <tr>
              <th>User</th>
              <th>E-mail</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody class="text-center text-secondary bg-light">
            ${users.map(user => `
  <tr>
  <td class="">${user.username}</td>
  <td>${user.mail}</td>
  <td>${user.team.map(pokemon => `
  <figure class="figure card-img mt-0 mb-0" style="max-width: 3rem;">
  <img src="styles/images/pokemon.gif" onload="getImage('https://www.cpokemon.com/pokes/anime/${pokemon}.png', this)" class="card-img rounded-circle img-thumbnail shadow-sm" alt="" title="pokemon">
  </figure>`).join(' ')}</td>
  </tr>`).join(' ')}
          </tbody></table>`;
}

//funcion para activar "boton seleccionado" del grupo de botones que lista pokemon por generaciones.
const buttonActive = (element) => {
  const elementActive = document.querySelector("div.btn-group.btn-group-sm button[class='btn btn-light active']");
  elementActive.classList.remove('active');
  element.classList.add('active');
}

//funcion para activar link del navbar seleccionado.
const linkActive = (element) => {
  const elementActive = document.querySelector(".btn.nav-link.pb-1.pt-1.ml-2.active");
  elementActive.classList.remove('active');
  element.classList.add('active');
}

//array de equipos
const teams_oponents = [];

//encounters: getSelection (users)
const getSelection = () => {
  const config = configHeaders();

  axios.get(`${url_API}/user/getSelection`, config)
    .then(resp => {
      resp.data.map(user => teams_oponents.push(user));
      displayTableOfUsers(resp.data);
    });
}

//mostrar tabla de los usuarios para iniciar encuentro.
const displayTableOfUsers = (users) => {
  const divEncounters = document.querySelector('#table-of-encounters');
  clearList(divEncounters);

  divEncounters.innerHTML = `
  <table class="table table-striped table-sm shadow-sm bg-light scroll-table small mt-1 mb-1 mr-0 ml-3">
    <thead>   <th class="pt-0 pb-1 ">User</th>
              <th class="pt-0 pb-1">Team</th>
              <th class="p-0"><img src="styles/images/insignia.png" style="width: 25%;">
              </th>
    </thead>
    <tbody id="tbody-table-encounters">
        ${users.map(user => `
          <tr>
          <td class="pt-3 pb-0">${user.username}</td>
          <td class="pl-1 pr-1">${user.team.map(pokemon => `
              <figure class="figure card-img mt-0 mb-0" style="max-width: 42px;">
                <img src="styles/images/pokemon.gif" onload="getImage('https://www.cpokemon.com/pokes/anime/${pokemon}.png', this)" class="card-img rounded-circle img-thumbnail shadow-sm" alt="" title="pokemon">
              </figure>`).join(' ')}</td>
          <td>
              <button class="btn btn-warning btn-sm rounded-pill pl-3 pr-3 pt-0 pb-0 mt-2 ml-2 mr-2 mb-0" data-id_oponent="${user.id}" data-username_oponent="${user.username}" onclick="verifyTeam(this)">
                  Battle
              </button>
          </td>
          </tr>`).join(' ')}
    </tbody>
  </table>`;
}

//Iniciar un encuentro 
const startEncounter = (element) => {
  showModal();

  const token = parseJwt();
  const username_oponent = element.dataset.username_oponent;
  const id_oponent = element.dataset.id_oponent;
  const message_result = document.querySelector('#message-results');
  const div_results = document.querySelector('#results-content');
  const name_user = document.querySelector('#modal-encounters-name-user');
  const name_oponent = document.querySelector('#modal-encounters-name-oponent');
  const div_team_user = document.querySelector('#team-user');
  const div_team_oponent = document.querySelector('#team-oponent');

  while (div_results.childElementCount > 1) div_results.lastChild.remove();
  message_result.removeAttribute('hidden');
  name_user.lastChild.remove();
  name_oponent.lastChild.remove();
  name_user.insertAdjacentText('beforeend', `${token.user.username}`);
  name_oponent.insertAdjacentText('beforeend', `${username_oponent}`);
  clearList(div_team_oponent);
  clearList(div_team_user);

  //pegar imagenes de los pokemon en el modal.
  const team_oponent = teams_oponents.find(item => item.id === parseInt(id_oponent)).team;
  div_team_oponent.innerHTML = `${pasteTeamPokemon(team_oponent)}`;
  div_team_user.innerHTML = `${pasteTeamPokemon(team)}`;

  //simular resultado de encuentro.
  getResults(id_oponent, team_oponent);

}

//pegar el equipo dentro del div_team
const pasteTeamPokemon = (team) => {
  return `${team.map(pokemon => `
      <figure class="figure card-img mt-0 mb-0" style="max-width: 45px;">
        <img src="styles/images/pokemon.gif" onload="getImage('https://www.cpokemon.com/pokes/anime/${pokemon}.png', this)" class="card-img rounded-circle img-thumbnail shadow-sm" alt="" title="pokemon">
      </figure>
  `).join('')}`;
}

//guardar encuentro
const saveEncounter = (id_oponent, team_winner, result) => {
  const config = configHeaders();
  const data = {
    id_oponent: id_oponent,
    result: result,
    team_winner: team_winner
  };

  axios.post(`${url_API}/encounters/save`, data, config)
    .then(resp => console.log(resp.data));

}

//verificar que el equipo este completo.
const verifyTeam = (element) => {
  if (team.length < 6) alert('ERROR: cannot start encounter! Please , complete the team.');
  else startEncounter(element);
}

//funcion que suma la vida de los pokemon de cada equipo por separado.
const getResults = async (id_oponent, team_oponent) => {
  const stats_my_team = await checkPokemonData(team);
  const stats_oponent_team = await checkPokemonData(team_oponent);
  const result = stats_my_team > stats_oponent_team;
  if (result) {
    displayResultOfEncounter('Winner');
    const token = parseJwt()
    saveEncounter(id_oponent, team, token.user.id);//guardar datos del encuentro y el equipo ganador
  }
  else {
    displayResultOfEncounter('Loser');
    saveEncounter(id_oponent, team_oponent, id_oponent);
  }
}

//mostrar resultado del encuentro finalizado
const displayResultOfEncounter = (message) => {
  const div_results = document.querySelector('#results-content');
  const message_result = document.querySelector('#message-results');
  const token = parseJwt();
  const result = `
  <div class="container">
  <h4>${message}</h4>
  <p>
    <svg class="bi bi-person" width="22px" viewBox="0 0 20 20"
      fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M15 16s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002zM5.022 15h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C13.516 12.68 12.289 12 10 12c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002zM10 9a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd" />
    </svg>
    ${token.user.username}
  </p>
  <button type="button" class="btn btn-secondary btn-sm rounded-pill pl-3 pr-3 pt-1 pb-1" onclick="hideModal()">
  Return
  </button>
  </div>`;

  //settimeout para simular calculo de los resultados .
  setTimeout(() => {
    message_result.setAttribute('hidden', '');
    div_results.insertAdjacentHTML('beforeend', result);
  }, 4000);
}

//encounters: buscar pokemons en el array y sumar los puntos 'hp' , 
//si no existe ; buscarlo en la pokeapi.
const checkPokemonData = async (array_team) => {
  const results = [];

  for (const i in array_team) {
    const result = pokemon.find(element => element.id === parseInt(array_team[i]));

    if (result === undefined) {
      const info_pokemon = await getPokemonData(parseInt(array_team[i]));
      const stats = info_pokemon.stats.find(item => item.stat.name === 'hp').base_stat;
      results.push(stats);

    } else {
      const stats = result.stats.find(item => item.stat.name === 'hp').base_stat;
      results.push(stats);

    }
  }

  const stats_team = results.reduce((total, stat) => total + stat);
  return stats_team;
}
/*
axios.get(url_API, {
    headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token')
}
}).then(resp => {

  });
*/
