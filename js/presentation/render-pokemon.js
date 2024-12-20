export const renderPokemon = async(pokemon) => {
    const divPokemons = document.getElementById("pokemons");

    //divPokemons.querySelectorAll(".card").forEach((element)=>{
    //  divPokemons.removeChild(element);
    //})
    divPokemons.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <p>${pokemon.name}</p>
    `;
  }