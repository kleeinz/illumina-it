import { Component, OnInit } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal";
import { GenericService } from '../../services/generic.service';
import { SharedService } from '../../services/shared.service';
import { User } from '../../models/user.model';
import { MdDialog } from '@angular/material';
import { DialogForm } from '../shared/modals/dialogForm';
import { ConfirmDialog } from '../shared/modals/confirmDialog';
import { FilterDataTablePipe } from '../shared/pipes/filter-datatable.pipe';
import { HidePasswordPipe } from '../shared/pipes/hide-password.pipe';

@Component({
	selector: 'users',
	templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit {
	private users: Array<User>;
	public filterInput:string;

	constructor(public dialog: MdDialog,
		private dialogService: DialogService,
		private genericService: GenericService<User>,
	  private sharedService: SharedService) {
			this.sharedService.componentMethodCalled.subscribe(
        () => {
					console.log("Executing populateDatatable");
          this.populateDatatable();
        }
      );
	}

	public ngOnInit() {
		this.populateDatatable();
	}

	private onSave() {
				this.sharedService.data = null;
        const dialogRef = this.dialog.open(DialogForm, {
            height: '550px',
            width: '400px'
        });
  }

  private onEdit(user: User) {
        console.log("user", user);
        const dialogRef = this.dialog.open(DialogForm, {
            height: '550px',
            width: '400px',
            data: {
								'_id': user._id,
                'username': user.username,
                'password': user.password,
                'userType': user.userType,
								'name': user.name,
								'image': user.image
            }
        });
  }

  private confirm(user: User) {
        const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width: '500px',
						data: {
								'user': user
						}
        })
  }

  private populateDatatable():any {
    	this.genericService.find<User>('userController').subscribe(success => {
    		this.users = success.data as User[];
    		return success.data;
    	}, error => {
    		console.log(error);
    		return error;
    	});
  }


}
