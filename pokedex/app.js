const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()));
    

const fetchPokemon = () => {

    const pokemonPromisses = generatePokemonPromises();

    Promise.all(pokemonPromisses).then(pokemons => {

        return pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            accumulator +=
                `<li class="card ${types[0]}">
                <img class="card-image" alt="${pokemon.name}" src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg"   />
               <h2 class="card-tittle"> ${pokemon.id}. ${pokemon.name} </h2>
               <p class="card-subtitle">${types.join(' | ')}</p> 
            </li>`
            return accumulator;
        }, '')
       
    })
    .then(pokemons => {
        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = pokemons;
    })
}
fetchPokemon();