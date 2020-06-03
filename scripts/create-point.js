function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then (r => r.json())
    .then( states => {
        for( state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/microrregioes`
    citySelect.innerHTML = ""
    citySelect.disabled = true
    fetch(url)
    .then (r => r.json())
    .then( cities => {

        for( city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)

}

const collectedItens = document.querySelector("input[name=itens")
let selectedItens = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adionando/removendo classe com JS
    itemLi.classList.toggle("selected")


    //verificando se há itens selecionados, se sim
    //pegar itens selecionados
    const itemId= event.target.dataset.id
    const alreadySelected = selectedItens.findIndex(item =>{
        const itemFound = item === itemId
        return itemFound
    });
    
    //se já estiver selecionado, tirar da seleção
    if(alreadySelected != -1){
        //tirando da selecao
        const filteredItens = selectedItens.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent;
        })
        selectedItens = filteredItens;

    }else{//se não estiver selecionado adicionar à seleção
        selectedItens.push(itemId)

    }
    //adicionar os itens ao campo escondido:
    collectedItens.value = selectedItens
}