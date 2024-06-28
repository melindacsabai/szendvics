import { AdminPageOrderer } from "./adminOrderer.js";
import { AdminPageOrder } from "./adminOrder.js";
import { request } from "./../js/request.mod.js";


const content = document.querySelector("#content");
const ordererArray = ["name","address","phone", "textarea"];
const orderArray = [];
let ORDER;

//getting order from server
document.querySelector(".show-btn").addEventListener("click", async function(){
content.innerHTML = "";
    await request.get("/orders")
    .then((resJson) => {
        let order = resJson;
        ORDER = order;
        const ordererData = new AdminPageOrderer(order, content);
        
        const orders = resJson.cart;
        console.log(orders)
        for(let o of orders){
            const orderData = new AdminPageOrder(o, content);
            orderArray.push(o.id);   
        }
        for(let o of orders)
            totalPriceFn(o.id);

        content.insertAdjacentHTML("beforeend",`
        <div class="summa">
        <span class="summa-text">Összesen: </span>
        <span class="summa-price"></span>
      </div>`
    )
    })
  

    summaPriceFn();

    //adding editfn for orderer datas
    for(let o of ordererArray){
       editDataFn(o);
    }
    
    //adding editfn and deleteFn for order datas
    for(let o of orderArray){
        editFn(o);
        deleteDataFn(o);
    }
    
});

//edit fn for order datas
function editFn (name){
    document.querySelector(`.${name}`).addEventListener("click", function(){
       let elem =  document.querySelector(`#${name}`);
       elem.style.backgroundColor =  "#d9d5c8";
       
       removeReadonlyAtt(`#${name} > input`);
       saveFn(name);

    })
}

//edit fn for orderer
function editDataFn (name){
    document.querySelector(`.${name}-img`).addEventListener("click", function(){
       let elem =  document.querySelector(`.${name}`);
       elem.style.backgroundColor =  "#d9d5c8";
       
       removeReadonlyAtt(`.admin-data-ct > .${name}`);
       saveDataFn(name);

    })
}

//removing readonly att. fn
function removeReadonlyAtt (elem){
    let elems = document.querySelectorAll(elem);
    for( let e of elems){
        e.removeAttribute("readonly")
        
    }
}

//setting readonly att. fn
function setReadonlyAtt (elem){
    let elems = document.querySelectorAll(elem);
    for( let e of elems){

            e.setAttribute("readonly", true)
        
    }
}

//totalpricefn for order piece
function totalPriceFn (elem){
    let unitPrice = document.querySelector(`#${elem} > .input-unitPrice`).value;
    let piece = document.querySelector(`#${elem} > .input-piece`).value;
    let total = document.querySelector(`#${elem}-total`);
    total.textContent = `${parseInt(unitPrice) * parseInt(piece)} Ft`;
}

//summa price for the whole order
function summaPriceFn(){
    let prices = document.querySelectorAll(".total");
    let summa = 0;
    for ( let p of prices){
        let price = parseInt(p.textContent)
        summa += price;
    }
    document.querySelector(".summa-price").textContent = `${summa} Ft`
}

//save fn after editing for order datas
function saveFn (elem){
    let savtBtn = document.querySelector(`#${elem}-save`);
    savtBtn.style.display = 'inline-block';
    savtBtn.addEventListener("click", function(){
        setReadonlyAtt(`#${elem} > input`);
        totalPriceFn(elem);
        savtBtn.style.display = "none"; 
        let div =  document.querySelector(`#${elem}`);
        div.style.backgroundColor =  "rgba(248, 245, 236, 0.719)";

        unpdateOrder(elem);

        summaPriceFn();
    });
  
}

//save fn after editing for orderer
function saveDataFn (elem){
    let savtBtn = document.querySelector(`#${elem}-save`);
    savtBtn.style.display = 'inline-block';
    savtBtn.addEventListener("click", function(){       
        setReadonlyAtt(`.admin-data-ct > .${elem}`);
        savtBtn.style.display = "none"; 
        let input =  document.querySelector(`.${elem}`);
        input.style.backgroundColor =  "white";

       unpdateData(elem);
    });
  
}

//updating order datas after editing (for sendig to server)
function unpdateOrder (elem){

    let ord = ORDER.cart;
    let NAME = document.querySelector(".name").value;
    let address = document.querySelectorAll(".address").value;
    let phone = document.querySelector(".phone").value;
    let indx = ord.findIndex(e => e.id == elem);
    let name = document.querySelector(".input-name").value;
    let piece = document.querySelector(".input-piece").value;
    let price = parseInt(document.querySelector(".total").textContent);
    ORDER.name = NAME;
    ORDER.address = address;
    ORDER.phone = phone;
    ord[indx].name = name;
    ord[indx].piece = piece;
    ord[indx].price = price;

    upDateServerData();
}

//updating orderer after editing (for sendig to server)
function unpdateData (elem){
    let name = document.querySelector(".name").value;
    let address = document.querySelector(".address").value;
    let phone = document.querySelector(".phone").value;
    let message = document.querySelector(`.${elem}`).value;
    ORDER.name = name;
    ORDER.address = address;
    ORDER.phone = phone;
    ORDER.message = message;

    upDateServerData();
}

//deleting order piece fn
function deleteDataFn (name){
    document.querySelector(`#${name}-delete`).addEventListener("click", function(){
        let elem =  document.querySelector(`#${name}`);
        elem.remove();
      
        summaPriceFn();
        upDateServerData();
     })
}

//updating datas and sending for server. Both for editing and deleting
function upDateServerData (){
    request.patch(`/update`, ORDER)
        .then( res => {
            alert(res.message);
        } );
};

