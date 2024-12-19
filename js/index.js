
import {zodiacSign} from './data/zodiac-sign.js';
import {createHoroscope} from './use-cases/create-horoscope.js';
import {getPokemon} from './services/pokemon.js';
import {renderPokemon} from './presentation/render-pokemon.js';
import {renderPredictions} from './presentation/render-prediction.js';
import {dailyHoroscope} from './models/daily-horoscope.js';

(async () => {

  //Obtenemos el elemento botón consultar
  const btnDob = document.getElementById("btnDob");

  //Agregamos el evento click para capturar cuando se hace click
  btnDob.addEventListener("click", async (event)=>{
    const inputBirthDateValue = document.getElementById("inputDob").value;
    console.log(inputBirthDateValue)
    //Validaciones para la interfaz gráfica
    if(!inputBirthDateValue){
      alert("Debe ingresar la fecha de nacimiento")
      return;
    }

    //Capturamos los datos
    const inputDay = inputBirthDateValue.split("/")[0];
    const inputMonth = inputBirthDateValue.split("/")[1] -1;
    const currentYear = new Date().getFullYear();
    
    console.log("inputDay", inputDay)
    console.log("inputMonth", inputMonth)
    console.log("currentYear", currentYear)

    //Creamos un objeto Date con los datos capturados
    //const inputDate = new Date(currentYear+"-"+inputMonth+"-"+inputDay);
    const inputDate = new Date();
    //Enero da problemas cuando más adelante se evalúa un rango de fechas
    //Se aumenta el año en 1 para encontrar a Capricornio
    inputDate.setFullYear((inputMonth===0)?currentYear+1:currentYear)
    inputDate.setMonth(inputMonth);
    inputDate.setDate(inputDay);

    console.log("inputDate", inputDate)
    //Recorremos todos los signos para encontrar el ingresado en la página
    for(let i=0;i<zodiacSign.length;i++){
      //Separamos las fechas de los signos en cada día y mes de inicio y fin
      const dayInitDate = zodiacSign[i].initDate.split("/")[0];
      const monthInitDate = zodiacSign[i].initDate.split("/")[1] -1;
      const dayEndDate = zodiacSign[i].endDate.split("/")[0];
      const monthEndDate = zodiacSign[i].endDate.split("/")[1] -1;

      //Creamos dos objetos Date para luego hacer la evaluación
      const start = new Date();
      start.setFullYear(currentYear)
      start.setMonth(monthInitDate);
      start.setDate(dayInitDate);
      const end = new Date();
      end.setFullYear((monthInitDate>monthEndDate)?currentYear+1:currentYear)
      end.setMonth(monthEndDate);
      end.setDate(dayEndDate);
      console.log("start", start)
      console.log("end", end)

      //Si la fecha ingresada está dentro del rango del signo, guardamos los datos base
      if(inputDate >= start && inputDate <= end){
        dailyHoroscope.signName = zodiacSign[i].signName;
        dailyHoroscope.currentDate = inputBirthDateValue;
        dailyHoroscope.initDate = zodiacSign[i].initDate;
        dailyHoroscope.endDate = zodiacSign[i].endDate;
        dailyHoroscope.element = zodiacSign[i].element;
        dailyHoroscope.pokemons = zodiacSign[i].pokemons;
        console.log("break!!!!!");
        break;
      }
    }
    console.log("dailyHoroscope: ", dailyHoroscope)
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
