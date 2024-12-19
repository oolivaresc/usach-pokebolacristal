(async () => {

  //Array de objetos signos zodiacales y sus pokemons
  const sign = [
    { signName: "Aries", initDate:"21/03", endDate: "19/04", pokemons: ["blaziken"], element:"Fire/Fuego" },
    { signName: "Taurus", initDate:"20/04", endDate: "20/05", pokemons: ["tauros"] , element:"Earth/Tierra"}, 
    { signName: "Gemini", initDate:"21/05", endDate: "20/06", pokemons: ["plusle", "minun"], element:"Air/Aire"},
    { signName: "Cancer", initDate:"21/06", endDate: "22/07", pokemons: ["kingler"], element:"Water/Agua"},
    { signName: "Leo", initDate:"23/07", endDate: "22/08", pokemons: ["pyroar"], element:"Fire/Fuego"},
    { signName: "Virgo", initDate:"23/08", endDate: "22/09", pokemons: ["gardevoir"],element:"Earth/Tierra"},
    { signName: "Libra", initDate:"23/09", endDate: "22/10", pokemons: ["togekiss"], element:"Air/Aire" },
    { signName: "Scorpio", initDate:"23/10", endDate: "21/11", pokemons: ["drapion"], element:"Water/Agua"},
    { signName: "Sagittarius", initDate:"22/11", endDate: "21/12", pokemons: ["rapidash"],element:"Fire/Fuego" },
    { signName: "Capricorn", initDate:"22/12", endDate: "19/01", pokemons: ["gogoat"],element:"Earth/Tierra"},
    { signName: "Aquarius", initDate:"20/01", endDate: "18/02", pokemons: ["vaporeon"], element:"Air/Aire"},
    { signName: "Pisces", initDate:"19/02", endDate: "20/03", pokemons: ["milotic"] , element:"Water/Agua"}
  ];

  //Array de colores
  const colors = [
    "Red",
    "Blue",
    "Yellow",
    "Green",
    "Brown",
    "Orange",
    "Black",
    "White",
    "Purple",
  ];

  //Array de números
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  //Array de horas
  const hours = [
    "12 am",
    "1 am",
    "2 am",
    "3 am",
    "4 am",
    "5 am",
    "6 am",
    "7 am",
    "8 am",
    "9 am",
    "10 am",
    "11 am",
    "12 pm",
    "1 pm",
    "2 pm",
    "3 pm",
    "4 pm",
    "5 pm",
    "6 pm",
    "7 pm",
    "8 pm",
    "9 pm",
    "10 pm",
    "11 pm",
  ];

  //Objeto de horoscopo diario vacío
  const dailyHoroscope = {
    sign: "",
    currentDate: "",
    compatibility: "",
    luckyNumber: "",
    luckyTime: "",
    color: "",
    description: "",
    pokemons: []
  };

  //Permite obtener el horoscopo a través de un API que solicita signo y día
  const getHoroscope = async (signSelected) => {
    const URL =
      "https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=" +
      signSelected +
      "&day=TODAY";
    let data;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }});
      data = await response.json();
      
    } catch (error) {
      console.error("Error:", error);
    }
    return data;
  };

  //Permite obtener datos de un pokemon a través de un API que pide el nombre del pokemon
  const getPokemon = async (pokemonSelected) => {
    const URL = "https://pokeapi.co/api/v2/pokemon/" + pokemonSelected;
    let data;
    try {
      const response = await fetch(URL);
      data = await response.json();
      console.log(dailyHoroscope);
    } catch (error) {
      console.error("Error:", error);
    }
    return data;
  };

  //Permite obtener un número aleatorio entre un rango de números
  const randomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const position = 2; //Cambiar el número para elegir el signo zodiacal
  const signSelected = sign[position].signName; //Obtenemos el nombre del signo zodiacal en la posición indicada
  const pokemonsSelected = sign[position].pokemons; //Obtenemos el nombre de los pokemon en la posición indicada
  
  //Invoca a getHoroscope() usando el signo seleccionado
  /*
  const data = await getHoroscope(signSelected);
  dailyHoroscope.sign = signSelected;
  dailyHoroscope.currentDate = data.data.date;
  dailyHoroscope.compatibility = sign[randomIntInRange(0, sign.length-1)];
  dailyHoroscope.color = colors[randomIntInRange(0, colors.length-1)];
  dailyHoroscope.luckyNumber = numbers[randomIntInRange(0, numbers.length-1)];
  dailyHoroscope.luckyTime = hours[randomIntInRange(0, hours.length-1)];
  dailyHoroscope.description = data.data.horoscope_data;
  */

  //Invoca a getPokemon() por cada pokemon seleccionado
  pokemonsSelected.forEach(async pokemon => {
    const data = await getPokemon(pokemon);
    dailyHoroscope.pokemons.push({"name": data.name, "image:": data.sprites.front_default});
    console.log(dailyHoroscope);
  });

  
  const btnDob = document.getElementById("btnDob");

  btnDob.addEventListener('click', (event)=>{
    const inputDobValue = document.getElementById("inputDob").value;
    if(!inputDobValue){
      alert("Debe ingresar la fecha de nacimiento")
      return;
    }
    const day = inputDobValue.split("/")[0];
    const month = inputDobValue.split("/")[1];

    const resultado = sign.filter(sign => {

        console.log(sign);
        const currentYear = new Date().getFullYear();
        const date = new Date(day+"/"+month+"/"+currentYear);
        const start = new Date(sign.initDate+"/"+currentYear);
        const end = new Date(sign.endDate+"/"+currentYear);
        console.log("date", date);
        console.log("start", start);
        console.log("end", end);
        return date >= start && date <= end;
      }
    );
    console.log(resultado);
  });
  

})();
