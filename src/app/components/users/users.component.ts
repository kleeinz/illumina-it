import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ModalComponent } from '../shared/modals/modal.component';
 import { DialogService } from "ng2-bootstrap-modal";

@Component({
	selector: 'users',
	templateUrl: 'users.component.html',
})
export class UsersComponent {
	constructor(private userService: UserService, private dialogService: DialogService) {}

	private showConfirm() {
            let disposable = this.dialogService.addDialog(ModalComponent, {
                title:'Confirm title', 
                message:'Confirm message'})
                .subscribe( (isConfirmed) => {
                    if(isConfirmed) {
                       console.log("Aceppted")
                    }
                    else {
                    	console.log("Declined");
                    	disposable.unsubscribe();
                    }
                });
    }
}