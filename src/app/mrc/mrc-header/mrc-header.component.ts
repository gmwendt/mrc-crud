import { Component, ViewEncapsulation, } from '@angular/core';
import { AuthGuardService } from '../../login/auth-guard.service';

@Component({
	selector: 'mrc-header',
	templateUrl: './mrc-header.component.html',
	styleUrls: ['./mrc-header.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class MrcHeaderComponent { 

	constructor(private _auth: AuthGuardService) {

	}

	get isAuthenticated(): boolean {
		if (this._auth)
			return this._auth.isAuthenticated();
	}
}
