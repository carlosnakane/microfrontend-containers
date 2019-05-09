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
    <h1>App B</h1>
    Web Component com javascript puro ☕
  `;


  class AppB extends HTMLElement {

    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ 'mode': 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      console.log('app-b connected');
    }

    disconnectedCallback() {
      console.log('app-b disconnected');
    }
    
  }
  window.customElements.define('app-b', AppB);
  })
();
