(function() {

  class RootMenu extends HTMLElement {

    constructor() {
      super();
    }

    connectedCallback() {
      console.log(this.itemsUrl);
      fetch(this.itemsUrl).then(res => res.json().then(json => console.log(json)));
    }

    draw(items) {
      this.innerHTML = '';
      const container = document.createElement('div');
      container.append(drawNode(items));
      this.appendChild(container);
    }

    drawNode(node) {
      const container = document.createElement('ul');
      const current = drawChildNode(node);
      if(Array.isArray(node.chidren)) {
        current.appendChild(node.chidren.map(child => drawNode(child)));
      }
      container.appendChild(current);
    }

    drawChildNode(child) {
      const container = document.createElement('li');
      if(child.assetsUrl !== undefined) {
        const link = document.createElement('a');
        link.setAttribute('href', chind.assetsUrl);
        link.appendChild(child.title);
        container.appendChild(link);
        return container;
      }
      container.appendChild(child.title);
      return container;
    }


    static get observedAttributes() {
      return ['items-url'];
    }

    get itemsUrl() {
      return this.getAttribute('items-url');
    }

    set itemsUrl(newValue) {
      this.setAttribute('items-url', newValue)
    }
    
  }
  window.customElements.define('root-menu', RootMenu);
  })
();
