import { request } from "./request.mod.js";
import { select } from "./select.js";
import { Product } from "./products.js";
import { Cart } from "./cart.js";
import { Order } from "./order.js";
import { sendingOrderFn } from "./sending-order.js";

export let CART = [];
export let reloadFn;


function START() {
  const content = document.querySelector(".content");
  const tovabb = document.querySelector(".btn-tovabb");
  const vissza = document.querySelector(".btn-vissza");
  let startBtn = document.querySelector(".start-btn");
  let startCt = document.querySelector(".start-ct");
  let body = document.querySelector(".body");
  let szamlalo;
 
  // let price;
  let total;
  let elem;
  // let summa;



  //basic createElement function
  function createElement(parent, cssName, text) {
    const element = document.createElement("div");
    element.className = cssName;
    if (text) {
      element.innerText = text;
    }

    parent.insertAdjacentElement("afterbegin", element);
    return element;
  }

    //message function

    function messageFn(){
     let message =  document.querySelector(".btn-inactive")
     message.addEventListener("click", function(){
        createElement(content, "message-box", "Kérlek válassz legalább egyet!");
   
     setTimeout(function(){ //késleltés beállítása
        document.querySelector(".message-box").remove()
    },1500)
    })

    }



  //rendering productsFn
  function renderProducts(productList) {
    const productsCt = document.createElement("div");
    productsCt.className = "products-ct container";
    const innerCt = createElement(content, "innerCt");
    for (const productData of productList) {
      const products = new Product(productData, productsCt);
      innerCt.appendChild(productsCt);
    }
  }

  //creating inactive div, for not stepping without selection
  function inactive() {
    const div = document.createElement("div");
    div.className = "btn-inactive";
    const btnInnerCt = document.querySelector(".btn-innerCt");
    btnInnerCt.appendChild(div);
    div.style.display = "flex";
  }


//product types
  const jsonElements = [
    "baguette",
    "butter",
    "hus",
    "sajt",
    "zoldsegek",
    "szosz",
  ];

 
//rendering product from server
  function renderInnerContent(element) {
    request.get(`/szendvics/${element}`).then((resJson) => {
      let valasztas = element;
      element = resJson;
      renderProducts(element);
      switch (true) {
        case valasztas === "baguette":
          select.singleSelectFn(".product", "selected");
          inactive();
          messageFn()
          break;
        case valasztas === "butter":
          select.noNeedToSelectFn(".product", "selected");
          break;
        case valasztas === "hus" ||
          valasztas === "zoldsegek" ||
          valasztas === "sajt" ||
          valasztas === "szosz":
          select.multiSelectFn(".product", "selected");
          inactive();
          messageFn()
      }
      renderCart();
    });
  }

//cart start Fn
  function renderCartStart() {
    const cartCt = document.createElement("div");
    cartCt.className = "cart-ct";

    const cartInnerCt = document.createElement("div");
    cartInnerCt.className = "cart-inner-ct";
    cartCt.appendChild(cartInnerCt);

    const cartText = createElement(cartCt, "cart-text", "Rendelésem");
    cartCt.insertAdjacentHTML(
      "beforeend",
      `
    <div class="total-ct"><span>Összesen:</span><span class="total">0</span><span class="total-text">Ft</span></div> 
    <div class="cart-btn-ct">
    
    <div class="cart-summa-btn">Megrendel</div> 
    </div>
  `
    );

    body.appendChild(cartCt);
  }

  //selection for cart Fn
  function selectedItemForCart() {
    const selectedItems = document.querySelectorAll(".selected");
    for (let selectedItem of selectedItems) {
      let data = selectedItem.getAttribute("data-type");
      request.get(`/szendvics/${data}`).then((resJson) => {
        for (let resJ of resJson) {
          if (resJ.id == selectedItem.id) {
            CART.push(resJ);
          }
        }
      });
    }
  }

  //rendering cartFn
  function renderCart() {
    let cartInnerCt = document.querySelector(".cart-inner-ct");
    cartInnerCt.innerHTML = "";

    for (let cartData of CART) {
      const cartItem = new Cart(cartData, cartInnerCt);
      let price = document.querySelector(".price");
      price.setAttribute("data-price", cartData.price);
    }
    cartItemsFn();
    cartItemTotal();
  }

  //buttons Fn in cart
  function cartItemsFn() {
    for (let elem in CART) {
      let elemT = CART[elem].type;
      let elemP = document
        .querySelector(`div[data = ${elemT}] .price`)
        .getAttribute("data-price");

      elem = document.querySelector(`div[data = ${elemT}] .piece`);

      let darab = parseInt(elem.innerText);

      let sumPrice = document.querySelector(`div[data = ${elemT}] .price`); 
      let eredmeny;

      let hozzaadBtn = document.querySelector(`div[data = ${elemT}] .hozzaad`);
      hozzaadBtn.addEventListener("click", function () { //adding cart items piece in cart
        if (elem != undefined) {
          if (darab < 10) {
            darab += 1;
            elem.innerText = darab;

            eredmeny = elemP * darab;
            sumPrice.innerText = eredmeny;
          }
          for (let elem in CART) {
            if (CART[elem].type === elemT) {
              CART[elem].piece = darab;
              CART[elem].price = eredmeny;
            }
          }
        }
        cartItemTotal();
      });

      let elveszBtn = document.querySelector(`div[data = ${elemT}] .elvesz`); //reducing cart item piece in cart
      elveszBtn.addEventListener("click", function () {
        elem = document.querySelector(`div[data = ${elemT}] .piece`);
        if (elem != undefined) {
          darab = parseInt(elem.innerText);
          if (darab > 1) {
            darab -= 1;
            elem.innerText = darab;

            eredmeny = elemP * darab;
            sumPrice.innerText = eredmeny;
          }
          for (let elem in CART) {
            if (CART[elem].type === elemT) {
              CART[elem].piece = darab;
              CART[elem].price = eredmeny;
            }
          }
        }
        cartItemTotal();
      });
    }

    let torolBtns = document.querySelectorAll(".csum .torles"); //deleteing items from cart
    torolBtns.forEach((torolBtn) => {
      torolBtn.addEventListener("click", function () {
        selectedItemForCart();
        let elemName = this.getAttribute("data-name");
        let cartElem = CART.find((elem) => elem.name == elemName);
        let cartInd = CART.indexOf(cartElem);
        CART.splice(cartInd, 1);
        renderCart();
      });
    });
  }

  //caunting total price in cart
  function cartItemTotal() {
    let totalSpan = document.querySelector(".total");
    total = 0;
    let prices = document.querySelectorAll(".csum .price");
    for (let price of prices) {
      total = parseInt(price.innerText) + total;
    }

    totalSpan.innerText = total;
  }

  //basic remove element Fn
  function removeInnerContetn() {
    let innerCt = document.querySelector(".innerCt");
      innerCt.remove()
  }

  //first step to start site
  function start() {
    szamlalo = 0;
    renderInnerContent(jsonElements[szamlalo]);
    szamlalo++;
    tovabb.style.display = "inline-block";
    tovabb.innerText = "Tovább";
    renderCartStart();
  }

  //reordering fn-strat from the beggining ---nem jó!!!!!!
  // function againFn(){
  //   document.querySelector(".cart-again-btn").addEventListener("click", async function () { 
  //     szamlalo = 0;
  //     tovabb.style.display = "inline-block";
  //     vissza.style.display = "none";
  //     tovabb.innerText = "Tovább";
  //     const inactive = document.querySelector(".btn-inactive");
  //     if (inactive)
  //      inactive.remove();
  
  //      removeInnerContetn()
  //      renderInnerContent(jsonElements[szamlalo]);
     
  //     szamlalo ++
  //   });
 
  // }
 


  //finishing order, senging order
  function orderFn(){
    const summa = document.querySelector(".cart-summa-btn")
    summa.addEventListener("click", function(){
      const content = document.querySelector(".content");
      content.innerHTML = ""
      const orderPerson = new Order(content);
      // document.querySelector(".cart-again-btn").style.display = "none";
      document.querySelector(".cart-summa-btn").style.display = "none";
      sendingOrderFn()
    })
  
  }

  startBtn.addEventListener("click", function () {
    startCt.style.display = "none";
    start();
  });

  //next step fn

  tovabb.addEventListener("click", async function () {
    if(szamlalo == 0)
      szamlalo++
    await selectedItemForCart();
    const inactive = document.querySelector(".btn-inactive");
    if (inactive) 
      inactive.remove();
    if (szamlalo <= jsonElements.length) {
      removeInnerContetn();
      renderInnerContent(jsonElements[szamlalo]);
      tovabb.style.display = "inline-block";
      if (szamlalo != 0) {
        vissza.style.display = "inline-block";
      }

      if (szamlalo == jsonElements.length - 1) {
        tovabb.innerText = "Kosárba";
        document.querySelector(".cart-btn-ct").style.display = "flex";
        // againFn();
        
      }
      }
      if (szamlalo < jsonElements.length - 1) {  
        document.querySelector(".cart-btn-ct").style.display = "none";
        szamlalo++;
      }   
       orderFn();
      
    })



//steping back fn
  vissza.addEventListener("click", function () {
    szamlalo--;
    const inactive = document.querySelector(".btn-inactive");
    if (inactive) inactive.remove();
    removeInnerContetn();
    renderInnerContent(jsonElements[szamlalo - 1]);
    tovabb.style.display = "inline-block";
    if (jsonElements[szamlalo - 1] === jsonElements[0]) {
      vissza.style.display = "none";
    }
    
    tovabb.innerText = "Tovább";
  });

reloadFn = function (){

  document.querySelector(".cart-again-btn").addEventListener("click", async function(){
     
    window.location.reload();
  //  content.innerHTML = `    
  //   <div class="btn-innerCt">
  //    <div class="btn-ct">
  //     <div class="btn-vissza">Vissza</div>
  //     <div class="btn-tovabb">Tovább</div>
  //   </div> `
  //   start();
   
     
  })
  }

}

export {START};