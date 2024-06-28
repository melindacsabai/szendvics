class Product {
  static tpl = (product) => `
    <div class="product ${product.type}" id="${product.id}">
    <div class="inner-ct">
        <div class="pimage">
            <img src="${product.img}" alt="${product.type}">
        </div>
        <div class="pname">${product.name}</div>
        <div class="price">${product.price}<span>Ft</span></div>
    </div>
    </div>
    `;


  #product;
  parentElement;
  element;


  constructor(product, parent) {
    this.product = product;
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
    div.innerHTML = Product.tpl(this.product);

    this.element = div.firstElementChild;
    this.parentElement.appendChild(this.element);
    this.element.setAttribute("data-price", this.product.price); //átnézr
    this.element.setAttribute("data-type", this.product.type)
  }
  
  set product(p) {
    this.#product = p;
  }

  get product() {
    return this.#product;
  }
}

export {Product};
