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
var itemUniqueId;
// console.log(itemUniqueId);



// -----------Create Functions---------->>>>


// ----------Alert Function------------>>>>

const alertPara = (alertInnerText, action) => {
    alertText.innerHTML = alertInnerText
    alertText.style.visibility = "visible"
    alertText.classList.add(`alert${action}`)
    
    setTimeout(() => {
        alertText.style.visibility = "hidden"
        alertText.classList.remove(`alert${action}`)

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
        alertPara(`Your Input is Empty! Please Write Something.`, `Danger`);
        buttonTransform();
        return
    }

    buttonTransform();

    var itemUniqueId = Date.now();

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



}


// ----------Edit Button Function------------>>>>

const editItem = (itemUId) => {
    console.log("Edited Item ID", itemUId);

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
    
    console.log(modaalInput.value);
    
    // console.log(itemUId);
    
    // console.log(itemLists.children[0]);
    
    // const editMyItem = Array.from(itemLists.children);
    
    // console.log(editMyItem[0]);
    
    // const filteredData2 = filteredData.find((singleItem) => singleItem.id === itemUId)
    
    // console.log(filteredData2);
    
    // filteredData[0].querySelector('p').innerHTML = modaalInput.value
    
    // alertPara(`${inputText.value} item is Edited`, `Success`);
}


// ----------Delete Button Function------------>>>>

const deleteItem = (itemUId) => {
    console.log("Deleted Item ID", itemUId);
    
    const findIndexNum = cartArticles.findIndex((perItem) => perItem.includes(itemUId));
    
    console.log(findIndexNum);
    
    cartArticles.splice(findIndexNum, 1);
    
    itemLists.innerHTML = cartArticles.join("");
    
    alertPara(`Item is deleted`, `Danger`);
    
    if (findIndexNum == "0") {

        clearAllButton.classList.add("hidden")

    }
}


// ----------Clear All Button Function------------>>>>

const clearAll = () => {
    
    // console.log("chal rha hai");
    
    cartArticles = [];
    
    itemLists.innerHTML = "";
    
    inputText.value = "";
    
    
    alertPara(`All Items are Cleared`, `Danger`)
    
    clearAllButton.classList.add("hidden")
    
}



// ----------Calling Function--------->>>>

addButton.addEventListener("click", listAdd);
clearAllButton.addEventListener("click", clearAll);
doneEditButton.addEventListener("click", editDoneButton);