
import {zodiacSign} from './data/zodiac-sign.js';
import {createHoroscope} from './use-cases/create-horoscope.js';
import {getPokemon} from './services/pokemon.js';
import {renderPokemon} from './presentation/render-pokemon.js';
import {renderPredictions} from './presentation/render-prediction.js';
import {dailyHoroscope} from './models/daily-horoscope.js';

(async () => {

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
    for(let i=0;i<zodiacSign.length;i++){
      //Separamos las fechas de los signos en cada día y mes de inicio y fin
      const dayInitDate = zodiacSign[i].initDate.split("-")[0];
      const monthInitDate = zodiacSign[i].initDate.split("-")[1];
      const dayEndDate = zodiacSign[i].endDate.split("-")[0]
      const monthEndDate = zodiacSign[i].endDate.split("-")[1]

      //Creamos dos objetos Date para luego hacer la evaluación
      const start = new Date(currentYear, monthInitDate, dayInitDate);
      const end = new Date(currentYear, monthEndDate, dayEndDate);

      //Si la fecha ingresada está dentro del rango del signo, guardamos los datos base
      if(inputDate >= start && inputDate <= end){
        dailyHoroscope.signName = zodiacSign[i].signName;
        dailyHoroscope.currentDate = inputBirthDateValue;
        dailyHoroscope.initDate = zodiacSign[i].initDate;
        dailyHoroscope.endDate = zodiacSign[i].endDate;
        dailyHoroscope.element = zodiacSign[i].element;
        dailyHoroscope.pokemons = zodiacSign[i].pokemons;
        break;
      }
    }

    //Invoca a createHoroscope() para completar la predicción
    createHoroscope(dailyHoroscope);

    //Invoca a getPokemon() por cada pokemon del signo
    dailyHoroscope.pokemons.forEach(async pokemon => {
      const data = await getPokemon(pokemon.name);
      
      //Cargamos sus datos
      pokemon.image = data.sprites.front_default;
      renderPokemon(pokemon);
    });
    renderPredictions(dailyHoroscope);
  });

})();
