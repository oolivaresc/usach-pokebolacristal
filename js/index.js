document.addEventListener("DOMContentLoaded", () => {
  const sign = [
    { signName: "Aries", initDate: "21/03", endDate: "19/04", pokemons: ["blaziken"], element: "Fire/Fuego" },
    { signName: "Taurus", initDate: "20/04", endDate: "20/05", pokemons: ["tauros"], element: "Earth/Tierra" },
    { signName: "Gemini", initDate: "21/05", endDate: "20/06", pokemons: ["plusle", "minun"], element: "Air/Aire" },
    { signName: "Cancer", initDate: "21/06", endDate: "22/07", pokemons: ["kingler"], element: "Water/Agua" },
    { signName: "Leo", initDate: "23/07", endDate: "22/08", pokemons: ["pyroar"], element: "Fire/Fuego" },
    { signName: "Virgo", initDate: "23/08", endDate: "22/09", pokemons: ["gardevoir"], element: "Earth/Tierra" },
    { signName: "Libra", initDate: "23/09", endDate: "22/10", pokemons: ["togekiss"], element: "Air/Aire" },
    { signName: "Scorpio", initDate: "23/10", endDate: "21/11", pokemons: ["drapion"], element: "Water/Agua" },
    { signName: "Sagittarius", initDate: "22/11", endDate: "21/12", pokemons: ["rapidash"], element: "Fire/Fuego" },
    { signName: "Capricorn", initDate: "22/12", endDate: "19/01", pokemons: ["gogoat"], element: "Earth/Tierra" },
    { signName: "Aquarius", initDate: "20/01", endDate: "18/02", pokemons: ["vaporeon"], element: "Air/Aire" },
    { signName: "Pisces", initDate: "19/02", endDate: "20/03", pokemons: ["milotic"], element: "Water/Agua" },
  ];

  const btnDob = document.getElementById("btnDob");
  const inputDob = document.getElementById("inputDob");

  btnDob.addEventListener("click", async () => {
    const inputDobValue = inputDob.value;
    if (!inputDobValue) {
      alert("Debe ingresar la fecha de nacimiento.");
      return;
    }

    const [day, month] = inputDobValue.split("/");
    const currentYear = new Date().getFullYear();
    const date = new Date(`${month}/${day}/${currentYear}`);

    const result = sign.find((s) => {
      const start = new Date(`${s.initDate}/${currentYear}`);
      const end = new Date(`${s.endDate}/${currentYear}`);
      return date >= start && date <= end;
    });

    if (result) {
      const horoscopeData = await getHoroscope(result.signName);
      displayHoroscope(result, horoscopeData);
    } else {
      alert("No se encontró un signo para esta fecha.");
    }
  });

  const getHoroscope = async (signSelected) => {
    try {
      const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${signSelected}&day=TODAY`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener el horóscopo:", error);
    }
  };

  const displayHoroscope = async (result, horoscopeData) => {
    document.getElementById("sign").innerText = result.signName;
    document.getElementById("element").innerText = result.element;
    document.getElementById("luckyNumber").innerText = horoscopeData.lucky_number || "N/A";
    document.getElementById("luckyTime").innerText = horoscopeData.lucky_time || "N/A";
    document.getElementById("color").innerText = horoscopeData.color || "N/A";
    document.getElementById("description").innerText = horoscopeData.horoscope_data;

    const pokemonsContainer = document.getElementById("pokemons");
    pokemonsContainer.innerHTML = ""; // Limpiar contenedor anterior
    for (const pokemon of result.pokemons) {
      const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const pokeJSON = await pokeData.json();
      const img = document.createElement("img");
      img.src = pokeJSON.sprites.front_default;
      img.alt = pokemon;
      img.style.width = "100px";
      pokemonsContainer.appendChild(img);
    }
  };
});
const start = new Date(sign.initDate+"/"+currentYear);
