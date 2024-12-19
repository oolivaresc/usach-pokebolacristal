//Permite obtener datos de un pokemon a través de un API que pide el nombre del pokemon
export const getPokemon = async (pokemonSelected) => {
  const URL = "https://pokeapi.co/api/v2/pokemon/" + pokemonSelected;
  let data;
  try {
    const response = await fetch(URL);
    data = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
  return data;
};
