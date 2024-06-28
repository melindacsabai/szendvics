import { request } from "./request.mod.js";
import { CART } from "./kezdes.js";
import { reloadFn } from "./kezdes.js";

const sendingOrderFn = () => {
  let orderBtn = document.querySelector(".order-btn");

  function dataCheckFn() {
    let name1 = document.querySelector(".data-familyname").value;
    let name2 = document.querySelector(".data-firstname").value;
    let address1 = document.querySelector(".data-address-zip").value;
    let address2 = document.querySelector(".data-address-city").value;
    let address3 = document.querySelector(".data-address-street").value;
    let address4 = document.querySelector(".data-address-number").value;
    let phone = document.querySelector(".data-phone-number").value;

    const orderData = {
      name: name1 + " " + name2,
      address: address1 + " " + address2 + " " + address3 + " " + address4,
      phone: phone,
      cart: CART,
    };
    if (
      name1.lenght > 2 &&
      name2.lenght > 2 &&
      address1.lenght > 3 &&
      address2.lenght > 3 &&
      address3.lenght > 3 &&
      address4.lenght > 0 &&
      phone.lenght > 9
    )
      alert("Kérlek minden adatot helyesen add meg!");

    return orderData;
  }

  orderBtn.addEventListener("click", async function () {
    const body = document.querySelector(".body");
    const data = dataCheckFn();
    if (data) {
      await request.post("/rendeles", data).then((res) => {
        body.innerHTML = `
          <div class="res-message">${res.message}</div>  
          <div class="cart-again-btn">Újat rendel</div> 
         
            `;
      });
      reloadFn();
    }
  });
};

export { sendingOrderFn };
