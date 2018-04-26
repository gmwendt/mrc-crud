import { Component, ViewEncapsulation } from '@angular/core';

//import { HttpService, MrcDataBaseHeaders } from './../../common/http.service';

import * as xml2json from 'jquery-xml2json';

@Component({
  selector: 'mrc-header-config',
	templateUrl: './mrc-header-config.component.html',
	styleUrls: ['./mrc-header-config.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class MrcHeaderConfigComponent { 
	private _filesExtensions: string = '.xml';
	
	//constructor(private _http: HttpService) {}
	
	private files_imported(files: FileList): void {		
		if (files.length < 1)
      return;
		
		for (var i = 0; i < files.length; i++) {
      var file = files[i];
			this.readFileAsync(file).then(result => {
				//TODO: mensagem adicionado com sucesso
				var json = xml2json(result);				
				//this._http.addInstance(json, MrcDataBaseHeaders.NFsentrada).subscribe(result => console.log(result));
			});
		}
	}
	
	private async readFileAsync(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsText(file);
    });
  }
}
