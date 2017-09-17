import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'navbar',
	templateUrl: 'navbar.component.html',
})
export class NavBarComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit() {

	}

	public logout():void {
		this.authService.logout();
	}
}
