import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../shared/modals/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MdDialog } from '@angular/material';
import { DialogForm } from '../shared/modals/dialogForm';
import { ConfirmDialog } from '../shared/modals/confirmDialog';


@Component({
	selector: 'users',
	templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit {
	private users: Array<User>;

	constructor(public dialog: MdDialog, private dialogService: DialogService, private userService: UserService<User>) {}

	public ngOnInit() {
		this.populateDatatable();
	}

	private onSave() {
        const dialogRef = this.dialog.open(DialogForm, {
            height: '500px',
            width: '400px'
        });

    }

    private onEdit(user: User) {
        console.log("userType", user.userType);
        const dialogRef = this.dialog.open(DialogForm, {
            height: '500px',
            width: '400px',
            data: {
                'username': user.username,
                'password': user.password,
                'userType': user.userType
            }
        });
    }

    private confirm() {
        const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width: '500px'
        })
    }

    private populateDatatable():any {
    	this.userService.find<User>('userController').subscribe(success => {
    		this.users = success.data as User[];
    		return success.data;
    	}, error => {
    		console.log(error);
    		return error;
    	});
    }
}
