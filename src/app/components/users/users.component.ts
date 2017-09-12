import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../shared/modals/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
	selector: 'users',
	templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit {
	private users: Array<User>;

	constructor(private dialogService: DialogService, private userService: UserService<User>) {}

	public ngOnInit() {
		this.populateDatatable();
	}

	private showConfirm() {
        let disposable = this.dialogService.addDialog(ModalComponent,);
    }

    private populateDatatable():any {
    	this.userService.find<User>('userController').subscribe(success => {
    		console.log(success);
    		this.users = success;
    		return success;
    	}, error => {
    		console.log(error);
    		return error;
    	});
    }
}