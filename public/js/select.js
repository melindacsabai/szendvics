const select = {
    singleSelectFn : function(selector, cssName) {
        const element = document.querySelectorAll(selector);
    
        element.forEach((child) => {
          child.addEventListener("click", function () {
            const selectedElement = document.querySelector("." + cssName);
            if (selectedElement) {
              selectedElement.classList.remove(cssName);
            }
            this.classList.add(cssName);    
            document.querySelector(".btn-inactive").style.display = "none";
          });
        });
      },

    noNeedToSelectFn :  function(selector, cssName){
        const element = document.querySelectorAll(selector);
        element.forEach((child) => {
          child.addEventListener("click", function () {
            const selectedElement = document.querySelectorAll("." + cssName);
            this.classList.toggle(cssName);
            if(selectedElement.length >= 1)
              selectedElement.forEach( element => element.classList.remove(cssName))
          });
      });
    },
    multiSelectFn : function(selector, cssName) {
        const element = document.querySelectorAll(selector);
        element.forEach((child) => {
          child.addEventListener("click", function () {
            const selectedElement = document.querySelector("." + cssName);
            this.classList.toggle(cssName);
            document.querySelector(".btn-inactive").style.display = "none";
          });
        });
      }    
}

export {select};