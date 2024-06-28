class Order {
  static dataTpl = () => `  
    <div class="order-data">
      <h3>Rendelő adatai:</h3>
      <span>Név:</span>
      <div class="data-name">
      <input type="text" name="name" class="data-familyname" placeholder="vezetéknév">
      <input type="text" name="name" class="data-firstname" placeholder="keresztnév">
    </div>
    <span>Cím:</span>
    <div class="data-address-1">
      <input type="text" name="address" class="data-address-zip" placeholder="ZIP">
      <input type="text" name="address" class="data-address-city" placeholder="város">
    </div>
      <div class="data-address-2">
      <input type="text" name="address" class="data-address-street" placeholder="utcanév">
      <input type="text" name="address" class="data-address-number" placeholder="házszám">
    </div>
    <span>Telefonszám:</span>
    <div class="data-phone">
      <input type="text" class="data-phone-number" placeholder="telefonszám">
    </div>
    <div class="order-btn-ct">
      <div class="order-btn">Elküld</div>
    </div>
    </div>  
    `;

  parentElement;
  element;

  constructor(parent) {
    this.parentElement =
      typeof parent == "string"
        ? document.querySelector(parent)
        : parent instanceof HTMLElement
        ? parent
        : document.createElement("div");

    this.build();
  }

  build() {
    const div = document.createElement("div");
    div.innerHTML = Order.dataTpl();
    this.element = div.firstElementChild;
    this.parentElement.appendChild(this.element);
  }
}

export { Order };
