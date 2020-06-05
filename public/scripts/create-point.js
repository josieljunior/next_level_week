
function populateUFs() { // função para selecionar as cidades
    const ufSelect = document.querySelector("select[name=uf]")// constante para armazenar a uf 

    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")//API do IBGE
    .then( res => res.json() )// transformar em .json
    .then( states => { // função para passar por todos os estados e mudar no html

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )

}
populateUFs( )// Executar função

function getCities(event) {// encontrar cidades dentro da uf
    const citySelect = document.querySelector("[name=city]")//Constante para armazenar a cidade
    const stateInput = document.querySelector("[name=state]")//Constante para armazenar o estado

    const ufValue = event.target.value //armazenar o valor da uf

    const indexOfSelectedState = event.target.selectedIndex//guardar o index do estado selecionado
    stateInput.value = event.target.options[indexOfSelectedState].text//mudar a constante para apresentar o nome do estado

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios `

    //limpar as cidades
    citySelect.innerHTML = "<option>Selecione a Cidade</option>"
    citySelect.disabled = true

    //// função para passar por todas as cidades e mudar no html
    fetch (url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities) {

            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false //habilitar o campo de cidade
    })
}
// Identificar que foi selecionado o estado e executar o getCities
document.
    querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// itens
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectItems = [] //itens selecinados pelo usuario

const collectedItems = document.querySelector("input[name=items]")// atualizar o campo oculto

function handleSelectedItem(event) {
    // adicionar classes html
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    
    
    const ItemId = event.target.dataset.id

    // verificar itens selecionados, se sim guarda-los
    const alreadySelected = selectItems.findIndex( function(item){
        const itemFound = item == ItemId
        return itemFound
    })
    // se ja estiver selecionado
    if (alreadySelected >= 0 ){
        //tirar seleção
        const filteredItems = selectItems.filter( item => {
            const itemIsDifferent = item != ItemId
            return itemIsDifferent
        })

        selectItems = filteredItems
    } else {
        //se não estiver selecionado
        //adicionar a seleçao
        selectItems.push(ItemId)
    }
    console.log(selectItems)

    collectedItems.value = selectItems//atualizar o campo oculto
}