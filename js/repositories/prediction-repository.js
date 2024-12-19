import {predictions} from '../data/predictions.js';

//Permite obtener el horoscopo del día
export const getPredictionBySignName = (signName) => {
    return predictions.find(prediction => prediction.signName === signName).description;
};