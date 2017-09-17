import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../models/user.model';
import { GenericService } from '../../../services/generic.service';
import { SharedService } from '../../../services/shared.service';
import { MdDialogRef } from '@angular/material';
import { DialogForm } from '../../shared/modals/dialogForm';

@Component({
	selector: 'user-form',
	templateUrl: 'form.component.html',
})
export class UserFormComponent {
    protected user: User;
    userForm: FormGroup;
    public message: string;
    public color:String;
    public username: string;

    constructor(private formBuilder: FormBuilder,
			private genericService: GenericService<User>,
			private dialog:MdDialogRef<DialogForm>,
			private sharedService: SharedService) {
        this.createForm();
				this.username= '';
    }

    public createForm() {
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            userType: ['User', Validators.required]
        })
    }

    public onSave(formGroup: FormGroup):any {
        console.log(JSON.stringify(formGroup.value));
        this.user = formGroup.value;
        this.genericService.save<User>(this.user, 'userController').subscribe(
                success => {
                    console.log(success.message);
                    this.message = success.message;
                    console.log(this.message);
                    this.color = 'success-color';
										this.refreshTable();
										this.dialog.close();
                    return success.message;
                },
                error => {
                    this.message = error;
                    this.color = 'error-color';
                    return error;
                }
            );
    }

		private refreshTable() {
			console.log("Executing refresh table");
			this.sharedService.callComponentMethod();
		}

    public validatePassword() {
        // let password = group.controls.password.value;
        // let repeat = group.controls.repeat.value;
        // return password === repeat ? null : { notMatch: true };
    }
}
