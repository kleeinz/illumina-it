import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../models/user.model';
@Component({
	selector: 'user-form',
	templateUrl: 'form.component.html',
})
export class UserFormComponent {
    user: User;
    userForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.createForm();
    }

    public createForm() {
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required]
        });
    }

    public onSubmit(formGroup: FormGroup) {
        console.log(formGroup.valid);
    }
}