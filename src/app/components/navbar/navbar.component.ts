import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'navbar',
	templateUrl: 'navbar.component.html',
})
export class NavBarComponent implements OnInit {
	private username: String;
	constructor(private authService: AuthService) {}

	ngOnInit() {
		if(!this.authService.user)
				this.username = 'Username';
		this.username = this.authService.user.username;
	}

	public logout():void {
		this.authService.logout();
	}
}
