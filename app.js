// -------------Get HTML------------->>>>

const inputText = document.querySelector("#inputText");
const addButton = document.querySelector(".textButton");
const itemLists = document.querySelector(".itemList");
const clearAllButton = document.querySelector(".clearItemButton");
const alertText = document.querySelector(".alertText");
const editModaal = document.querySelector(".modaal");
const doneEditButton = document.querySelector("#endEditing");
const modaalInput = document.querySelector("#modaalInput");
const overlay = document.querySelector(".overlay");
// console.log(alertText);


// --------Create Empty Array------->>>>

let cartArticles = []
// let itemUniqueId;


// -----------Create Funstions---------->>>>

// ----------Alert Function------------>>>>

const alertPara = (alertInnerText) => {
    alertText.innerHTML = alertInnerText
    alertText.style.visibility = "visible"

    setTimeout(() => {
        alertText.style.visibility = "hidden"

    }, 1500)
}


// ----------button Transform Function------------>>>>

const buttonTransform = () => {
    addButton.style.transform = "scale(0.8)";

    setTimeout(() => {
        addButton.style.transform = "scale(1)";

    }, 100)
}


// ----------Add Button Function------------>>>>

const listAdd = () => {

    // console.log(inputText.value);

    if (inputText.value === "") {
        alertPara(`Your Input is Empty! Please Write Something.`);
        buttonTransform();
        return
    }

    buttonTransform();

    let itemUniqueId = Date.now();

    // console.log(itemUniqueId);

    // let div = document.createElement("div");
    // div.setAttribute("class", "item");
    // div.setAttribute("id", `${itemUniqueId}`);
    // let para = document.createElement("p");
    // let paraText = document.createTextNode(`${inputText.value}`);
    // para.appendChild(paraText);
    // div.appendChild(para);
    // let div2 = document.createElement("div");
    // div2.setAttribute("class", "itemButtons");
    // let editButton = document.createElement("button");
    // editButton.setAttribute("class", "editItemButton");
    // editButton.setAttribute("onclick", `editItem('${itemUniqueId}')`);
    // let editButtonIcon = document.createElement("i");
    // editButtonIcon.setAttribute("class", "fa-solid fa-pen-to-square");
    // editButton.appendChild(editButtonIcon); 
    // let deleteButton = document.createElement("button");
    // deleteButton.setAttribute("class", "deleteItemButton"); 
    // deleteButton.setAttribute("onclick", `deleteItem('${itemUniqueId}')`); 
    // let deleteButtonIcon = document.createElement("i");
    // deleteButtonIcon.setAttribute("class", "fa-solid fa-trash");
    // deleteButton.appendChild(deleteButtonIcon);
    // div2.appendChild(editButton) 
    // div2.appendChild(deleteButton)
    // div.appendChild(div2) 

    // console.log(div);

    // itemLists.appendChild(div)


    const itemArticleList = `<div id="${itemUniqueId}" class="item">
                                <p>${inputText.value}</p>
                                <div class="itemButtons">
                                    <button class="editItemButton" onclick="editItem('${itemUniqueId}')">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button class="deleteItemButton" onclick="deleteItem('${itemUniqueId}')">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                             </div>`;
    // console.log(itemArticleList);

    cartArticles.push(itemArticleList);
    // console.log(cartArticles);

    itemLists.innerHTML = cartArticles.join("");
    // console.log(cartArticles);

    // alertText.style.backgroundColor = "#1b9e01";

    alertPara(`${inputText.value} is Added to your Grocery Cart`);

    inputText.value = "";

}


// ----------Edit Button Function------------>>>>

const editItem = (itemUId) => {
    console.log("Edited Item ID", itemUId);

    editModaal.classList.remove("hidden")
    overlay.classList.remove("hidden")

    // let modaalInputTag = document.createElement("input");
    // modaalInputTag.setAttribute("type", "text");
    // modaalInputTag.setAttribute("id", "modaalInput");
    // let modaalButtonTag = document.createElement("button");
    // modaalButtonTag.setAttribute("type", "submit");
    // modaalButtonTag.setAttribute("id", "endEditing");
    // modaalButtonTag.setAttribute("onclick", "editDoneButton()");
    // let modaalButtonText= document.createTextNode("Done");
    // modaalButtonTag.appendChild(modaalButtonText);
    // editModaal.appendChild(modaalInputTag);
    // editModaal.appendChild(modaalButtonTag);


    // console.log(editModaal);

    const editMyItem = Array.from(itemLists.childNodes);

    const filteredData = editMyItem.filter((singleItem) => singleItem.id === itemUId)

    modaalInput.value = filteredData[0].querySelector('p').innerHTML

    // console.log(filteredData[0].querySelector('p').innerHTML)
}


// ----------Edit Done Button Function------------>>>>

const editDoneButton = () => {
    editModaal.classList.add("hidden")
    overlay.classList.add("hidden")

    console.log(modaalInput);

    const editMyItem = Array.from(itemLists.childNodes);

    const filteredData = editMyItem.filter((singleItem) => singleItem.id)

    console.log(filteredData[0].querySelector('p'));

    filteredData[0].querySelector('p').innerHTML = modaalInput.value

    alertPara(`${inputText.value} item is Edited`);
}

// ----------Delete Button Function------------>>>>

const deleteItem = (itemUId) => {
    console.log("Deleted Item ID", itemUId);

    const findIndexNum = cartArticles.findIndex((perItem) => perItem.includes(itemUId));

    console.log(findIndexNum);

    cartArticles.splice(findIndexNum, 1);

    itemLists.innerHTML = cartArticles.join("");

    alertPara(`${inputText.value} item is deleted`);
}


// ----------Clear All Button Function------------>>>>

const clearAll = () => {

    // console.log("chal rha hai");

    if (itemLists.innerHTML === "") {
        alertPara(`Item List already Empty`);
        return
    }

    // alertText.style.backgroundColor = "red";

    cartArticles = [];

    itemLists.innerHTML = "";

    inputText.value = "";


    alertPara(`All Items are Cleared`)

}



// ----------Calling Function--------->>>>

addButton.addEventListener("click", listAdd);
clearAllButton.addEventListener("click", clearAll);
doneEditButton.addEventListener("click", editDoneButton);