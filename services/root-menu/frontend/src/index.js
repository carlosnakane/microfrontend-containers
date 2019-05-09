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
      const container = this._shadowRoot.querySelector('div');
      container.addEventListener('click', (e) => {
        e.preventDefault(e);
        const href = e.target.getAttribute('href');
        if(href != null) {
          this.dispatchEvent(new CustomEvent('routeClick', { detail: href, bubbles: true }));
        }
        return false;
      });
    }

    connectedCallback() {
      this.draw();
    }

    draw() {
      const container = this._shadowRoot.querySelector('div');
      const items = JSON.parse(this.routes);
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
      link.setAttribute('name', item.name);
      link.appendChild(document.createTextNode(item.label));
      container.appendChild(link);
      return container;
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if(name === 'routes') {
        this.draw();
      }
    }

    static get observedAttributes() {
      return ['routes'];
    }

    get routes() {
      return this.getAttribute('routes');
    }
    
  }
  window.customElements.define('root-menu', RootMenu);
  })
();

// setTimeout(() => {
//   const menu = document.getElementsByTagName('root-menu')[0];
//   menu.setAttribute('routes', '[{"name":"app-a","path":"/app-a","label":"App A"}]');
//   menu.addEventListener('routeClick', e => console.log(e));
// } ,1000);