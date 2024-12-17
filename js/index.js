import {predictions} from './data/predictions.js';
import {colors} from './data/colors.js';
import {luckyNumbers} from './data/luckyNumbers.js';
import {luckyHours} from './data/luckyHours.js';
import {dailyHoroscope} from './models/dailyHoroscope.js';

(async () => {

  //Array de objetos signos zodiacales y sus pokemons
  const signs = [
    { signName: "Aries", initDate:"21-03", endDate: "19-04", pokemons: [{"name": "blaziken"}], element:"Fuego" },
    { signName: "Tauro", initDate:"20-04", endDate: "20-05", pokemons: [{"name": "tauros"}] , element:"Tierra"}, 
    { signName: "Géminis", initDate:"21-05", endDate: "20-06", pokemons: [{"name": "plusle"}, {"name": "minun"}], element:"Aire"},
    { signName: "Cáncer", initDate:"21-06", endDate: "22-07", pokemons: [{"name": "kingler"}], element:"Agua"},
    { signName: "Leo", initDate:"23-07", endDate: "22-08", pokemons: [{"name": "pyroar"}], element:"Fuego"},
    { signName: "Virgo", initDate:"23-08", endDate: "22-09", pokemons: [{"name": "gardevoir"}],element:"Tierra"},
    { signName: "Libra", initDate:"23-09", endDate: "22-10", pokemons: [{"name": "togekiss"}], element:"Aire" },
    { signName: "Escorpio", initDate:"23-10", endDate: "21-11", pokemons: [{"name": "drapion"}], element:"Agua"},
    { signName: "Sagitario", initDate:"22-11", endDate: "21-12", pokemons: [{"name": "rapidash"}],element:"Fuego" },
    { signName: "Capricornio", initDate:"22-12", endDate: "19-01", pokemons: [{"name": "gogoat"}],element:"Tierra"},
    { signName: "Acuario", initDate:"20-01", endDate: "18/-02", pokemons: [{"name": "vaporeon"}], element:"Aire"},
    { signName: "Piscis", initDate:"19-02", endDate: "20-03", pokemons: [{"name": "milotic"}] , element:"Agua"}
  ];

  //Permite obtener el horoscopo del día
  const getHoroscope = (signName) => {
    return predictions.find(prediction => prediction.signName === signName).description;
  };

  //Permite obtener datos de un pokemon a través de un API que pide el nombre del pokemon
  const getPokemon = async (pokemonSelected) => {
    const URL = "https://pokeapi.co/api/v2/pokemon/" + pokemonSelected;
    let data;
    try {
      const response = await fetch(URL);
      data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
    return data;
  };

  //Obtenemos el elemento botón consultar
  const btnDob = document.getElementById("consultButton");

  //Agregamos el evento click para capturar cuando se hace click
  btnDob.addEventListener("click", async (event)=>{
    const inputBirthDateValue = document.getElementById("birthDate").value;
    
    //Validaciones para la interfaz gráfica
    if(!inputBirthDateValue){
      alert("Debe ingresar la fecha de nacimiento")
      return;
    }

    //Capturamos los datos
    const inputDay = inputBirthDateValue.split("-")[2];
    const inputMonth = inputBirthDateValue.split("-")[1];
    const currentYear = new Date().getFullYear();

    //Creamos un objeto Date con los datos capturados
    const inputDate = new Date(currentYear, inputMonth, inputDay);

    //Recorremos todos los signos para encontrar el ingresado en la página
    for(let i=0;i<signs.length;i++){
      //Separamos las fechas de los signos en cada día y mes de inicio y fin
      const dayInitDate = signs[i].initDate.split("-")[0];
      const monthInitDate = signs[i].initDate.split("-")[1];
      const dayEndDate = signs[i].endDate.split("-")[0]
      const monthEndDate = signs[i].endDate.split("-")[1]

      //Creamos dos objetos Date para luego hacer la evaluación
      const start = new Date(currentYear, monthInitDate, dayInitDate);
      const end = new Date(currentYear, monthEndDate, dayEndDate);

      //Si la fecha ingresada está dentro del rango del signo, guardamos los datos base
      if(inputDate >= start && inputDate <= end){
        dailyHoroscope.signName = signs[i].signName;
        dailyHoroscope.currentDate = inputBirthDateValue;
        dailyHoroscope.initDate = signs[i].initDate;
        dailyHoroscope.endDate = signs[i].endDate;
        dailyHoroscope.element = signs[i].element;
        dailyHoroscope.pokemons = signs[i].pokemons;
        break;
      }
    }

    //Invoca a getHoroscope() usando el signo encontrado
    const data = await getHoroscope(dailyHoroscope.signName);
    dailyHoroscope.description = data;

    //Invoca a getPokemon() por cada pokemon del signo
    dailyHoroscope.pokemons.forEach(async pokemon => {
      const data = await getPokemon(pokemon.name);
      
      //Cargamos sus datos
      pokemon.image = data.sprites.front_default;
      renderPokemon(pokemon);
    });
    console.log("dailyHoroscope", dailyHoroscope);

    makeLocalPredictions(dailyHoroscope);

    renderPredictions(dailyHoroscope);
  });

  const makeLocalPredictions = (dailyHoroscope) => {
    dailyHoroscope.compatibility = signs[randomIntInRange(0, signs.length-1)].signName;
    dailyHoroscope.color = colors[randomIntInRange(0, colors.length-1)];
    dailyHoroscope.luckyNumber = luckyNumbers[randomIntInRange(0, luckyNumbers.length-1)];
    dailyHoroscope.luckyTime = luckyHours[randomIntInRange(0, luckyHours.length-1)];
  }

  const renderPredictions = (dailyHoroscope) => {
    const spanSign = document.getElementById("sign");
    const spanDate = document.getElementById("date");
    const spanCompatibility = document.getElementById("compatibility");
    const spanLuckyNumber = document.getElementById("luckyNumber");
    const spanLuckyTime = document.getElementById("luckyTime");
    const spanColor = document.getElementById("color");
    const spanDescription = document.getElementById("description");

    spanSign.innerHTML = "";
    spanDate.innerHTML = "";
    spanCompatibility.innerHTML = "";
    spanLuckyNumber.innerHTML = "";
    spanLuckyTime.innerHTML = "";
    spanColor.innerHTML = "";
    spanDescription.innerHTML = "";

    spanSign.innerHTML = dailyHoroscope.signName;
    spanDate.innerHTML = dailyHoroscope.currentDate;
    spanCompatibility.innerHTML = dailyHoroscope.compatibility;
    spanLuckyNumber.innerHTML = dailyHoroscope.luckyNumber;
    spanLuckyTime.innerHTML = dailyHoroscope.luckyTime;
    spanColor.innerHTML = dailyHoroscope.color;
    spanDescription.innerHTML = dailyHoroscope.description;
  }

  const renderPokemon = async(pokemon) => {
    const divPokemons = document.getElementById("pokemons");

    //divPokemons.querySelectorAll(".card").forEach((element)=>{
    //  divPokemons.removeChild(element);
    //})
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <p>${pokemon.name}</p>
    `;
    divPokemons.appendChild(card);
  }

  //Permite obtener un número aleatorio entre un rango de números
  const randomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

})();
