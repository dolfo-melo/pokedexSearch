const pokemonName = document.querySelector('.pokemonName');
const pokemonID = document.querySelector('.pokemonID');
const pokemonIMG = document.querySelector('.pokemonIMG');
const pokemonInfo = document.querySelector('.pokemonInfo');


const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-nxt');
const buttonInfo = document.querySelector('.showInfo');

let searchPokemon = 1;

// Implementando a busca
const fetchPokemon = async (pokemon) => {

    // Adicionando a API
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    // Tratando erros, caso o pokemon não seja encontrado
    if(apiResponse.status === 200){
        //Coletando os dados dos pokemons
        const data = await apiResponse.json()
    
        return data
    }

}

// Rederizando dados na tela
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonID.innerHTML = '';

    const data = await fetchPokemon(pokemon)
    if (data){
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    pokemonIMG.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonIMG.style.display = 'flex';
    } else {
        pokemonIMG.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :(';
        pokemonID.innerHTML = '';
    }
    //Limpando o valor da pesquisa
    input.value = '';
}

// Adicionando a pesquisa no campo do formulário
form.addEventListener('submit', (event) => {

    event.preventDefault();
    
    renderPokemon(input.value);
})

//Funcionalidades dos botões
buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
    
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click', () => {

    searchPokemon++;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon)
