//Permite obtener un número aleatorio entre un rango de números
export const randomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};