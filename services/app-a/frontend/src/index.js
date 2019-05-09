(function() {

  const template = document.createElement('template');
  template.innerHTML = `
    <style>
        :host {
        display: block;
        font-family: sans-serif;
        text-align: center;
        }
    </style>
    <h1>App A</h1>
    Web Component com javascript puro (babel ES6)
  `;


  class AppA extends HTMLElement {

    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ 'mode': 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      console.log('app-a connected');
    }

    disconnectedCallback() {
      console.log('app-a disconnected');
    }
    
  }
  window.customElements.define('app-a', AppA);
  })
();
