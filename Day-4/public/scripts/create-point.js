function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs();


function getCities(event) {


    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true;


    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        })
}


document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)


// Itens de coleta
// Pegar todos os LIs

const itensToCollet = document.querySelectorAll(".items-grid li");

for (const item of itensToCollet) {
    item.addEventListener("click", handleSelectedItem);
}

// update the hidden field with the selected itens
const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];


function handleSelectedItem(event) {
    const itemLi = event.target;

    // add or remove a class with JS
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id;


    // verify if there is selected itens, 
    // if yes, get the selected itens

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId  // will be true or false
        return itemFound;
    });

    // if already selected, take it off from the selection
    if (alreadySelected >= 0) {
        // remove from selection
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiferent = item != itemId;
            return itemIsDiferent
        });

        selectedItems = filteredItems;

        // if it's not selected, add to the selection
    } else {
        selectedItems.push(itemId);
    }
    console.log(selectedItems);

    // update the hidden input field
    collectedItems.value = selectedItems;

}