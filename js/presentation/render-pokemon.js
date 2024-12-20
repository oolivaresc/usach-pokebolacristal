export const renderPokemon = async(pokemon) => {
    const divPokemons = document.getElementById("pokemons");

    const imgPokemon = document.createElement("img");
    imgPokemon.setAttribute("src", pokemon.image);
    imgPokemon.setAttribute("alt", pokemon.name);

    const pPokemon = document.createElement("p");
    pPokemon.innerHTML = pokemon.name;

    divPokemons.append(imgPokemon);
    divPokemons.append(pPokemon);

    /*= `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <p>${pokemon.name}</p>
    `;*/
  }