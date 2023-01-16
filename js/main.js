// catch elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let btnDelate = document.getElementById('delateAll');
let search = document.getElementById("search");

let mood ="create";
let tmp; //global variable


// *******get total price*******
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    }
    else{
        total.innerHTML = "";
        total.style.backgroundColor = '#a00d02';
    }
}


// *******create products and save in localstorage*******
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro = []
}
// when click on create
submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML, //because this not input this small
        count:count.value,
        category:category.value.toLowerCase(),
    }


    if(title.value !='' 
    && price.value !='' 
    && category.value !=''
    && newPro.count < 100){
        // count
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0 ; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }    
        }
        // mood = update
        else{ 
            dataPro[tmp] = newPro ; 
            mood = 'create';
            submit.innerHTML = "Create";
            count.style.display = "block";

        }
        clearData();    
    }

    
    localStorage.setItem('product', JSON.stringify(dataPro)); //save localstorage

    showData();
}


// *******clear inputs after create*******
function clearData(){
    // we call this function when click on create(submit.onclick)
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// *******read product*******
function showData(){
    getTotal();
    // we call this function when click on create(submit.onclick) | always call because display data every time
    let table ='';
    for(let i = 0; i < dataPro.length ; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deletData(${i})" id="delate">Delate</button></td>
        </tr>
        `
    }
    tbody.innerHTML = table;
    // create delte all btn if we have data
    if(dataPro.length > 0){
        btnDelate.innerHTML = 
        `
        <button onclick="delateAll()">Delete All (${dataPro.length})</button>
        `
    }
    else{
        btnDelate.innerHTML = '';
    }
}
showData();


// *******delate one product*******
function deletData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// *******delate all product*******
function delateAll(){
    dataPro.splice(0);
    localStorage.clear();
    showData();
}

// *******update Data*******
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display= 'none';
    submit.innerHTML = 'Update';
    mood = "update" ; 
    tmp = i;
    scroll({
        top:0,
        behavior: "smooth"
    });
}

// *******search*******
let searchMood = 'title';
// first we detrmine our mood
function getSearchMood(id){
    if(id =='searchTitle'){
        searchMood = 'title';
    }
    else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+searchMood;

    search.focus();
    search.value ='';
    showData();
}
// second we apply search function
function searchData(value){
    let table;

    if(searchMood == 'title'){
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLoweCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deletData(${i})" id="delate">Delate</button></td>
                </tr>
                `
            }
        }
    }
    else{//category
        for(let i = 0 ; i < dataPro.length ; i++){
            if(dataPro[i].category.includes(value.toLoweCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deletData(${i})" id="delate">Delate</button></td>
                </tr>
                `
            }
        }
    }

    tbody.innerHTML = table;
}

// *******clean data (valid)*******
// user should enter title , price and category
// maximum number of  count = 100
