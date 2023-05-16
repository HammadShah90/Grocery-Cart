// -------------Get HTML Elements------------->>>>

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


// --------Create Variables------->>>>

let editedUID = null
let cartArticles = JSON.parse(localStorage.getItem('myList')) || []

itemLists.innerHTML = cartArticles.join("")

if(itemLists.innerHTML = cartArticles.join("")){
    clearAllButton.classList.remove("hidden")
}

// -------------------Create Functions------------------->>>>>>>>>>>


// ----------Alert Function------------>>>>

const alertPara = (alertInnerText, action) => {
    alertText.innerHTML = alertInnerText
    alertText.style.visibility = "visible"
    alertText.classList.add(`alert${action}`)
    
    setTimeout(() => {
        alertText.style.visibility = "hidden"
        alertText.classList.remove(`alert${action}`)

    }, 2000)
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
        alertPara(`Your Input is Empty! Please Write Something.`, `Danger`);
        buttonTransform();
        return
    }

    buttonTransform();

    let itemUniqueId = Date.now();

    // console.log(itemUniqueId);

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

    clearAllButton.classList.remove("hidden")

    cartArticles.push(itemArticleList);
    // console.log(typeof cartArticles.push(itemArticleList));

    itemLists.innerHTML = cartArticles.join("");
    // console.log(typeof cartArticles.join(""));

    alertPara(`${inputText.value} is Added to your Grocery Cart`, `Success`);

    inputText.value = "";

    localStorage.setItem('myList', JSON.stringify(cartArticles))

}



// ----------Edit Button Function------------>>>>

const editItem = (itemUId) => {
    // console.log("Edited Item ID", itemUId);

    editedUID = itemUId

    editModaal.classList.remove("hidden")
    overlay.classList.remove("hidden")


    const editMyItem = Array.from(itemLists.children);

    // console.log(itemLists.children[itemUId].id);

    const filteredData = editMyItem.filter((singleItem) => singleItem.id === itemUId)

    // console.log(filteredData[0].querySelector('p').innerHTML);

    modaalInput.value = filteredData[0].querySelector('p').innerHTML
    
    
    // console.log(filteredData[0].querySelector('p').innerHTML)
    
    
}



// ----------Edit Done Button Function------------>>>>

const editDoneButton = () => {

    editModaal.classList.add("hidden")
    overlay.classList.add("hidden")

    // console.log(editedUID);
    
    // console.log(modaalInput.value);
    
    const indexNum = cartArticles.findIndex((singleItem) => singleItem .includes(editedUID));

    // console.log(indexNum);

    cartArticles.splice(indexNum, 1, `<div id="${editedUID}" class="item">
                                        <p>${modaalInput.value}</p>
                                        <div class="itemButtons">
                                            <button class="editItemButton" onclick="editItem('${editedUID}')">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button class="deleteItemButton" onclick="deleteItem('${editedUID}')">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                     </div>`);

    // console.log(cartArticles);

    itemLists.innerHTML = cartArticles.join("");

    localStorage.setItem('myList', JSON.stringify(cartArticles));
}



// ----------Delete Button Function------------>>>>

const deleteItem = (itemUId) => {
    // console.log("Deleted Item ID", itemUId);
    
    const findIndexNum = cartArticles.findIndex((perItem) => perItem.includes(itemUId));
    
    console.log(findIndexNum);
    
    cartArticles.splice(findIndexNum, 1);
    
    itemLists.innerHTML = cartArticles.join("");
    
    alertPara(`Item is deleted`, `Danger`);
    
    if (itemLists.innerHTML === "") {

        clearAllButton.classList.add("hidden")

    }

    localStorage.setItem('myList', JSON.stringify(cartArticles));
}



// ----------Clear All Button Function------------>>>>

const clearAll = () => {
    
    // console.log("chal rha hai");
    
    cartArticles = [];
    
    itemLists.innerHTML = "";
    
    inputText.value = "";
    
    
    alertPara(`All Items are Cleared`, `Danger`);
    
    clearAllButton.classList.add("hidden");

    localStorage.setItem('myList', JSON.stringify(cartArticles));
    
}



// ----------Calling Function--------->>>>

addButton.addEventListener("click", listAdd);
clearAllButton.addEventListener("click", clearAll);
doneEditButton.addEventListener("click", editDoneButton);