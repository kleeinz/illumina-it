import { Component, OnInit } from '@angular/core';
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
  private isAdmin: boolean;
  
  /**
  The constructor initialize the variables declared above.
  @param dialog The injection of the Mdialog from the material library
  @param genericService The injection of GenericService
  @param sharedService The injection of the SharedService to use methods between components and send information
  */
  constructor(public dialog: MdDialog,
		private genericService: GenericService<User>,
	  private sharedService: SharedService) {
			// Subscribing the shared service for sending the populateDatatable method
      this.sharedService.componentMethodCalled.subscribe(
        () => {
          this.populateDatatable();
        }
      );
      // Allowing permissions
      let userStorage = localStorage.getItem("userLogged");
      if (userStorage && JSON.parse(userStorage).user.userType === 'admin') {
          this.isAdmin = true;
      }

	}

  /* Hook that initialize the datatable in the view */
	public ngOnInit() {
		this.populateDatatable();

	}

  /* Method in the component for building the DialogForm with dialogRef service of material.io */
	private onSave() {
				this.sharedService.data = null;
        const dialogRef = this.dialog.open(DialogForm, {
            height: '600px',
            width: '400px'
        });
  }

  /* Method in the component for building the DialogForm with dialogRef service of material.io 
    This method also sends the user information with its data property
  */
  private onEdit(user: User) {
        const dialogRef = this.dialog.open(DialogForm, {
            height: '600px',
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

  /* Method in the component for building the ConfirmDialog with dialogRef service of material.io */
  private confirm(user: User) {
        const dialogRef = this.dialog.open(ConfirmDialog, {
            height: '200px',
            width: '500px',
						data: {
								'user': user
						}
        })
  }

  /**
  * This method calls to the find method in the GenericService to get all users in the database
  * @return any a list of users 
  */
  private populateDatatable():any {
    	this.genericService.find('userController').subscribe(success => {
    		this.users = success.data as User[];
    		return success.data;
    	}, error => {
    		return error;
    	});
  }


}
