import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Auth } from '../../models/auth.model';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
})
export class LoginComponent {
	protected auth: Auth;
	authForm: FormGroup;	

	constructor(private router: Router, private userService: UserService<Auth>, private formBuilder: FormBuilder) {
		this.createAuthForm();
	}

	public createAuthForm() {
		this.authForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		})
	}

	public onSubmit(formGroup: FormGroup) {
		console.log(JSON.stringify(formGroup.value));
		this.auth = formGroup.value;
		this.userService.auth<Auth>(this.auth, 'userController').subscribe(
			success => {
				//return success.message;
				return this.router.navigate(['/home']);
			}, 
			error =>{
				return error;
			});
	}

}