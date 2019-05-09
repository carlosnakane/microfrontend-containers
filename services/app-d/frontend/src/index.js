import ReactDOM from 'react-dom';
import React from 'react';
import AppDComponent from './app-d';

class AppD extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    ReactDOM.render(<AppDComponent />, mountPoint);
  }
}
customElements.define('app-d', AppD);