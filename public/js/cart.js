class Cart {
  static cartTpl = (product) => `  
        <div class="cart">
            <div class="cimage">
              <img src="${product.img}" alt="${product.type}">
            </div>
          <div class="cname">${product.name}
          <div class="cprice">${product.unitPrice} Ft</div>
          </div>
          <div class="csum">
            <span class="hozzaad">+</span>
            <span class="piece">${product.piece}</span>
            <span class="elvesz">-</span>
            <span class="egyenlo">=</span>
            <span data-price=${product.unitPrice} class="price">${product.price}</span><span>Ft</span>
            <span class="torles" data="${product.type}" data-name="${product.name}" >x</span>
        </div> 
      
 
`;

  parentElement;
  element;

  constructor(product, parent) {
    this.parentElement =
      typeof parent == "string"
        ? document.querySelector(parent)
        : parent instanceof HTMLElement
        ? parent
        : document.createElement("div");

    this.product = product;

    this.build();
  }

  build() {
    const div = document.createElement("div");
    div.innerHTML = Cart.cartTpl(this.product);
    this.element = div.firstElementChild;
    this.parentElement.appendChild(this.element);
    this.element.setAttribute("data", this.product.type);
  }
}

export {Cart};