import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'my-app',
  template: '<mrc></mrc>'
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) document: Document) {
		this.applyMainStyle(document);
  }
  
  private async applyMainStyle(document: Document): Promise<void> {		
		var link = document.createElement("link");
		link.href = "assets/sass/layout/main.css";
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);
  }
}
