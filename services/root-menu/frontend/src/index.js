(function() {

  const template = document.createElement('template');
  template.innerHTML = `
    <style>
        :host {
          font-family: sans-serif;
        }
    </style>

    <div>
    </div>
  `;

  class RootMenu extends HTMLElement {

    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ 'mode': 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      this.draw();
    }

    draw() {
      const container = this._shadowRoot.querySelector('div');
      const items = JSON.parse(this.itemsList);
      container.innerHTML = '';
      
      if(!Array.isArray(items)) {
        return;
      }
      
      const node = this.drawNode(items);
      container.appendChild(node);
    }

    drawNode(items) {
      const container = document.createElement('ul');
      const children = items.map(item => this.drawChildNode(item).outerHTML);
      container.innerHTML = children.join('');
      return container;
    }

    drawChildNode(item) {
      const container = document.createElement('li');
      const link = document.createElement('a');
      link.setAttribute('href', item.path);
      link.appendChild(document.createTextNode(item.title));
      container.appendChild(link);
      return container;
    }


    static get observedAttributes() {
      return ['items-list'];
    }

    get itemsList() {
      return this.getAttribute('items-list');
    }

    set itemsList(newValue) {
      this.setAttribute('items-list', newValue);
      this.draw();
    }
    
  }
  window.customElements.define('root-menu', RootMenu);
  })
();
