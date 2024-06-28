

class AdminPageOrderer {
  static adminDataTpl = (order) => `  
       <div class="admin-data-ct">
        <input class="name" type="text" value="${order.name}" readonly><img class="name-img"  src="../img/edit.png" alt="edit">
        <span id="name-save" class="save-btn">Mentés</span>
        <input class="address" type="text" value="${order.address}" readonly><img class="address-img" src="../img/edit.png" alt="edit">
        <span id="address-save" class="save-btn">Mentés</span>
        <input class="phone" type="text" value="${order.phone}" readonly><img class="phone-img" src="../img/edit.png" alt="edit">
        <span id="phone-save" class="save-btn">Mentés</span>
        <textarea class="textarea" rows="4" cols="60" placeholder="Megjegyzés" readonly></textarea>
        <img class="textarea-img" src="../img/edit.png" alt="edit">
        <span id="textarea-save" class="save-btn">Mentés</span>
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
    div.innerHTML = AdminPageOrderer.adminDataTpl(this.order);
    this.element = div.firstElementChild;
    this.parentElement.appendChild(this.element);
  }
}

export { AdminPageOrderer };
