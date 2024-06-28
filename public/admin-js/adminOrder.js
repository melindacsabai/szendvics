

class AdminPageOrder {

    static adminOrderTpl = (order) => `
         <div class="admin-order-ct">
          <div id="${order.id}">
          <input type="text" value="${order.name}" class="input-name" readonly>
          <input type="text" value="${order.unitPrice} Ft" class="input-unitPrice" readonly>
          <input type="text" value="${order.piece}" class="input-piece" readonly>
          <img class="${order.id}"  src="../img/edit.png" alt="edit">
          <span id="${order.id}-total" class="total"></span>
          <span id="${order.id}-save" class="save-btn">Mentés</span>
          <span id="${order.id}-delete" class="delete-btn">x</span>
          </div>
   
         </div> 
    `;
  
    parentElement;
    element;
  
    constructor(order, parent) {
      this.parentElement =
        typeof parent == "string"
          ? document.querySelector(parent)
          : parent instanceof HTMLElement
          ? parent
          : document.createElement("div");
  
      this.order = order;
  
      this.build();
    }
  
    build() {
      const div = document.createElement("div");
      div.innerHTML = AdminPageOrder.adminOrderTpl(this.order);
      this.element = div.firstElementChild;
      this.parentElement.appendChild(this.element);
    }
  }
  
  export { AdminPageOrder };
  