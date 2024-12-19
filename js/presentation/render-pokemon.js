export const renderPokemon = async(pokemon) => {
    const divPokemons = document.getElementById("pokemons");

    //divPokemons.querySelectorAll(".card").forEach((element)=>{
    //  divPokemons.removeChild(element);
    //})
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <p>${pokemon.name}</p>
    `;
    divPokemons.appendChild(card);
  }