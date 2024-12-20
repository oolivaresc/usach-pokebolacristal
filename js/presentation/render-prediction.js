export const renderPredictions = (dailyHoroscope) => {
    const spanSign = document.getElementById("sign");
    const spanCompatibility = document.getElementById("compatibility");
    const spanLuckyNumber = document.getElementById("luckyNumber");
    const spanLuckyTime = document.getElementById("luckyTime");
    const spanColor = document.getElementById("color");
    const spanDescription = document.getElementById("description");

    spanSign.innerHTML = "";
    spanCompatibility.innerHTML = "";
    spanLuckyNumber.innerHTML = "";
    spanLuckyTime.innerHTML = "";
    spanColor.innerHTML = "";
    spanDescription.innerHTML = "";

    spanSign.innerHTML = dailyHoroscope.signName;
    spanCompatibility.innerHTML = dailyHoroscope.compatibility;
    spanLuckyNumber.innerHTML = dailyHoroscope.luckyNumber;
    spanLuckyTime.innerHTML = dailyHoroscope.luckyTime;
    spanColor.innerHTML = dailyHoroscope.color;
    spanDescription.innerHTML = dailyHoroscope.description;

    //Mostramos el section con el resultado
    const horoscopeResults = document.getElementById("horoscope-results");
    horoscopeResults.classList.remove('main__section--horoscope-disabled');
    horoscopeResults.classList.add('main__section--horoscope-active');

    //Desactivamos el botón consulta
    const btnDob = document.getElementById("btn-dob");
    btnDob.classList.remove('main__section__btn--consultar-active');
    btnDob.classList.add('main__section__btn--consultar-disabled');

    //Activamos el botón de nueva consulta
    const btnNewPrediction = document.getElementById("btn-new-prediction");
    btnNewPrediction.classList.remove('main__section__btn--nuevo-disabled');
    btnNewPrediction.classList.add('main__section__btn--nuevo-active');

  }