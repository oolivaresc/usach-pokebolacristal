export const renderPokemon = async(pokemon) => {
    const divPokemons = document.getElementById("pokemons");

    //Convertimos la primera letra en mayúscula
    const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1, pokemon.name.length);

    const imgPokemon = document.createElement("img");
    imgPokemon.setAttribute("src", pokemon.image);
    imgPokemon.setAttribute("alt", pokemonName);

    const pPokemon = document.createElement("p");
    pPokemon.innerHTML = pokemonName;

    divPokemons.append(imgPokemon);
    divPokemons.append(pPokemon);

    const consejeroPokemon = document.getElementById("consejero-pokemon");
    consejeroPokemon.innerHTML = pokemonName + " dice: ";
    
  }