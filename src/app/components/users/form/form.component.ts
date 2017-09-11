import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'user-form',
	templateUrl: 'form.component.html',
})
export class UserFormComponent {
    user: User;
    userForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private userService: UserService<User>) {
        this.createForm();
    }

    public createForm() {
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            userType: ['', Validators.required]
        });
    }

    public onSubmit(formGroup: FormGroup):any {
        console.log(JSON.stringify(formGroup.value));
        this.user = formGroup.value;
        this.userService.save<User>(this.user, 'userController').subscribe(
                success => {
                    return "User created";
                },

                error => {
                    return "Error Code: " + error;
                }
            );
    }
}