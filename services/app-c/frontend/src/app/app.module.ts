import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppCComponent } from './app-c/app-c.component';

@NgModule({
  declarations: [
    AppCComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [AppCComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const appC = createCustomElement(AppCComponent, { injector: this.injector });
    customElements.define('app-c', appC);
  }
  ngDoBootstrap() { }
}
