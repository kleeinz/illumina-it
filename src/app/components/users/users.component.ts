import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
	selector: 'users',
	templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit {
	constructor(private userService: UserService) {}

	ngOnInit() {
		
	}

	public onSave(user: User):any {
		this.userService.save(user , '').subscribe(
			success => {

			},

			error => {
				
			}

			);
	}
}