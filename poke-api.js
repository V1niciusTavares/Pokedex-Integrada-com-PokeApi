const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) { // função para converter do modelo da pokeapi para meu modelo 
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url) // novo fetch 
        .then((response) => response.json()) // convertando fetch para json  
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` // fazendo requisições ao pokeapi

    return fetch(url) // buscando lista no servidor
        .then((response) => response.json()) // convertando esse o http response pra json
        .then((jsonBody) => jsonBody.results)   // filtrando para pegar apenas os detalhes
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // mapeando em uma lista de requisições do detalhe do pokemon   
        .then((detailRequests) => Promise.all(detailRequests)) // detailRequests = requisições de detalhes e o promisse.all que esperar todas as requisições terminar 
        .then((pokemonsDetails) => pokemonsDetails) // lista dos detalhes
}