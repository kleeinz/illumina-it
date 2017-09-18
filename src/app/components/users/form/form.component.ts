import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
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
		private usernameNgModel: string;
		private nameNgModel: string;
		private passwordNgModel: string;
		private userTypeNgModel: string;
		private confirmNgModel: string;
		private readOnly:boolean;
		private idNgModel:string;
		private data:any;

    constructor(private formBuilder: FormBuilder,
			private genericService: GenericService<User>,
			private dialog:MdDialogRef<DialogForm>,
			private sharedService: SharedService) {
        this.createForm();
				this.data = this.getData();
				this.userTypeNgModel = 'user';
				console.log(this.data);
				if (this.data){
						if (this.data.username) {
								this.readOnly = true;
						}
						this.idNgModel = this.data._id;
						this.usernameNgModel = this.data.username;
						this.nameNgModel = this.data.name;
						this.passwordNgModel = this.data.password;
						this.userTypeNgModel = this.data.userType;
						this.confirmNgModel = this.data.password;
				}
    }

    public createForm() {
        this.userForm = this.formBuilder.group({
						name: ['', Validators.required],
						passwords: this.formBuilder.group({
							password: ['', Validators.required],
							confirm: ['', Validators.required]
						}, { validator: this.validatePassword }),
						username: ['', Validators.required],
            userType: ['User', Validators.required]
        })
    }

    public onSave(formGroup: FormGroup):any {
        console.log(JSON.stringify(formGroup.value));
        this.user = formGroup.value;
				if(this.data)
						this.user._id = this.idNgModel;
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

		private getData() {
			console.log("Getting data");
			return this.sharedService.data;
		}

    private validatePassword(abstractControl: AbstractControl): { invalid: boolean } {
        if (abstractControl.get('pass') !== abstractControl.get('confirm'))
						return { invalid: true };
    }
}
