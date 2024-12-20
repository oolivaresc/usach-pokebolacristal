import {getPredictionBySignName} from '../repositories/prediction-repository.js';
import {getElementBySignName} from '../repositories/prediction-repository.js';
import {zodiacSign} from '../data/zodiac-sign.js';
import {colors} from '../data/colors.js';
import {luckyNumbers} from '../data/lucky-numbers.js';
import {luckyHours} from '../data/lucky-hours.js';
import {randomIntInRange} from '../utils/util.js';

//Permite obtener el horoscopo del día
export const createHoroscope = (dailyHoroscope) => {
    dailyHoroscope.description =  getPredictionBySignName(dailyHoroscope.signName);
    dailyHoroscope.element =  getElementBySignName(dailyHoroscope.signName);
    dailyHoroscope.compatibility = zodiacSign[randomIntInRange(0, zodiacSign.length-1)].signName;
    dailyHoroscope.color = colors[randomIntInRange(0, colors.length-1)];
    dailyHoroscope.luckyNumber = luckyNumbers[randomIntInRange(0, luckyNumbers.length-1)];
    dailyHoroscope.luckyTime = luckyHours[randomIntInRange(0, luckyHours.length-1)];
};