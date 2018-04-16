import { Injectable } from '@angular/core';

@Injectable()
export class MrcContentService {
  private _current: any
	
  get Current(): any {
    return this._current;
  }
	
  set Current(content: any) {
    if (this._current == content)
	  return;
		
	this._current = content;
  }
}