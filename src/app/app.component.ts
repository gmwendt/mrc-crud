import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { SystemInfo } from './mrc/common/types';
import { SystemInfoService } from './shared/system-info.service';

@Component({
  selector: 'my-app',
  //template: '<router-outlet></router-outlet>'
  template: '<mrc></mrc>'
})
export class AppComponent implements OnInit {
  constructor(@Inject(DOCUMENT) document: Document, private _systemInfo: SystemInfoService) {
		this.applyMainStyle(document);
  }

  ngOnInit(): void {
    this._systemInfo.getSystemInfo().then((infos: SystemInfo[]) => {
      if (infos.length > 0)
        this._systemInfo.systemInfo = infos[0];
      else //TODO: percorrer lista de accounts, encontrar a maior, incrementar
        this._systemInfo.addSystemInfo({
          nextAccountSequence: 1000
        });
    });
  }
  
  private async applyMainStyle(document: Document): Promise<void> {		
		var link = document.createElement("link");
		link.href = "assets/sass/layout/main.css";
		link.type = "text/css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);
  }
}
