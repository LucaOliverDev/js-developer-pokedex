
const pokemonName = document.getElementById('pokemonName')
const pokemonImage = document.getElementById('pokemonImage')
const pokemonNumber = document.getElementById('pokemonNumber')
const pokemonTypes = document.getElementById('pokemonTypes')
const pokemonWeight = document.getElementById('pokemonWeight')
const pokemonHeight = document.getElementById('pokemonHeight')
const pokemonStats = document.getElementById('pokemonStats')

// Pega o número do Pokémon que veio pela URL
const urlParams = new URLSearchParams(window.location.search)
const pokemonId = urlParams.get('id')

// Busca os dados do Pokémon na PokeAPI
function loadPokemonDetails() {

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(pokemon => {

            pokemonName.innerText = pokemon.name

            pokemonImage.src =
                pokemon.sprites.other['official-artwork'].front_default

            pokemonImage.alt = pokemon.name

            // Identifica o primeiro tipo do Pokémon
            const firstType = pokemon.types[0].type.name

            // Aplica a classe correspondente à cor
            pokemonImage.className = firstType

            pokemonNumber.innerText =
                `Número: #${pokemon.id}`

            pokemonTypes.innerText =
                `Tipos: ${pokemon.types.map(type => type.type.name).join(', ')}`

            pokemonWeight.innerText =
                `Peso: ${pokemon.weight / 10} kg`

            pokemonHeight.innerText =
                `Altura: ${pokemon.height / 10} m`

            pokemonStats.innerHTML = pokemon.stats.map(stat => `
                <li>
                    ${stat.stat.name}: ${stat.base_stat}
                </li>
            `).join('')

        })
        .catch(error => {
            pokemonName.innerText = 'Erro ao carregar Pokémon'
            console.error(error)
        })
}

loadPokemonDetails()




