import {predictions} from '../data/predictions.js';
import {zodiacSign} from '../data/zodiac-sign.js';

//Permite obtener el horoscopo del día
export const getPredictionBySignName = (signName) => {
    return predictions.find(prediction => prediction.signName === signName).description;
};
//este trae el elemento 
export const getElementBySignName = (signName) => {
    return zodiacSign.find(zodiacSign => zodiacSign.signName === signName).element;
   
};