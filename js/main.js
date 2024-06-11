// ! html variable
let  nameInput = document.getElementById("name");
let  priceInput = document.getElementById("price");
let  catInput = document.getElementById("category");
let  desInput = document.getElementById("description");
let  addBtn = document.getElementById("add");
let  updateBtn = document.getElementById("update");



// ! app variable
 let  updateIndex = -1;
let productList=[];
let  row = document.getElementById("demo");


if(localStorage.getItem("products") != null){
    productList = JSON.parse(localStorage.getItem("products"));
    displayProduct(productList);
  
}else{
    productList = [];
}


// ! functions
function getProduct(){
    if(validateProductName()== true && validateProductPrice()== true){
        let  product = {
            name: nameInput.value,
            price:priceInput.value,
            cat: catInput.value,
            des: desInput.value,
        }
    productList.push(product);
    console.log(productList);
    saveToLocalStorage();
    displayProduct(productList);
    clearInput()
    }else{
        //  nameInput.classList.add("is-invalid");
        //  priceInput.classList.add("is-invalid");
        console.log("error")
    }
   
}


function  displayProduct(list){
    let  cartona="";
    for(let i=0 ;i<list.length ; i++){
       cartona += ` <tr>
                        <td>${i+1}</td>
                        <td>${productList[i].newName? list[i].newName :list[i].name}</td>
                        <td>${productList[i].price}</td>
                        <td>${productList[i].cat}</td>
                        <td>${productList[i].des}</td>
                        <td><button onclick="setProduct(${i})" class="btn btn-danger"><i class="fa-solid fa-pen-nib"></i></button></td>
                        <td><button onclick="deleteProduct(${i})" class="btn btn-success"><i class=" fa-solid fa-trash"></i></button></td>
                    </tr>`;
    }
    row.innerHTML = cartona;
}


function clearInput(){
    nameInput.value ="";
    priceInput.value = "";
    catInput.value = "";
     desInput.value = "";
}
   
function deleteProduct(index){
   productList.splice(index,1);
    saveToLocalStorage();
   displayProduct(productList);
}

function  saveToLocalStorage(){
    localStorage.setItem("products", JSON.stringify(productList));
}

function  setProduct(index){
   updateIndex = index;

    nameInput.value = productList[index].name;
    priceInput.value = productList[index].price;
    catInput.value = productList[index].cat;
     desInput.value = productList[index].des;

     addBtn.classList.add("d-none");
     updateBtn.classList.replace("d-none","d-block");


}


function  updateProduct(){
    console.log(updateIndex);
    productList[updateIndex].name = nameInput.value ;
     productList[updateIndex].price = priceInput.value; 
     productList[updateIndex].cat = catInput.value;
     productList[updateIndex].des = desInput.value;

     addBtn.classList.remove("d-none");
     updateBtn.classList.replace("d-block","d-none");

     displayProduct(productList);
     saveToLocalStorage();
     clearInput()
}


function  searchProductByName(term){
    let  foundItems =[];
    for (let i=0; i<productList.length; i++){
        if(productList[i].name.toLowerCase().includes(term.toLowerCase()) == true){
            productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(),`<span class="text-danger">${term}</span>`)
            foundItems.push(productList[i]);
            
        }
    }
    // console.log(foundItems);
    displayProduct(foundItems);
}

 function validateProductName(){
    let regexName = /^[A-Z][a-z]{2,10}$/;
    if(regexName.test(nameInput.value) ==true ){
        nameInput.classList.add("is-valid");
         nameInput.classList.remove("is-invalid");
        return true;
    }else{
        nameInput.classList.add("is-invalid");
         nameInput.classList.remove("is-valid");
        return false;
    }
 }

 function validateProductPrice(){
    let regexPrice = /^[0-9]{4,5}$/;
    if(regexPrice.test(priceInput.value) ==true ){
        priceInput.classList.add("is-valid");
        priceInput.classList.remove("is-invalid");
        return true;
    }else{
        priceInput.classList.add("is-invalid");
        priceInput.classList.remove("is-valid");
        return false;
    }
 }
 

// ! events
   addBtn.addEventListener("click",getProduct);
   updateBtn.addEventListener("click",updateProduct);