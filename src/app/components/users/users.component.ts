import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../shared/modals/modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import {MdDialog} from '@angular/material';
import {DialogContentExampleDialog} from '../shared/modals/dialog-content-example-dialog';


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

	openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      height: '350px',
			data: {'name': 'jorge'}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
