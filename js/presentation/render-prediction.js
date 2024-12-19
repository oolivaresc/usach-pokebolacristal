export const renderPredictions = (dailyHoroscope) => {
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