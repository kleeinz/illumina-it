import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { User } from '../../../models/user.model';
import { GenericService } from '../../../services/generic.service';
import { SharedService } from '../../../services/shared.service';
import { ImageService } from '../../../services/image.service';
import { MdDialogRef } from '@angular/material';
import { UserFormDialog } from '../../shared/modals/user/user.form.dialog';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload/ng2-file-upload';

@Component({
	selector: 'user-form',
	templateUrl: 'user.form.component.html',
})
export class UserFormComponent implements OnInit {
	protected user: User;
	userForm: FormGroup;
	passwords: FormGroup;
	public message: string;
	public uploadMessage: string;
	public fileUploaded: string;
	public color:String;
	private usernameNgModel: string;
	private nameNgModel: string;
	private passwordNgModel: string;
	private userTypeNgModel: string;
	private confirmNgModel: string;
	private readOnly:boolean;
	private idNgModel:string;
	private data:any;
	private uploader:FileUploader;
	private imageNgModel: string;

	/**
	* Injections
	* @param formBuilder The injection of the FormBuilder component
	* @param genericService The injection of the generic service
	* @param dialog The injection of the MdDialogRef with the corresponding DialogForm to use
	* @param imageService The image service to upload the image
	* Also in the constructor is declared the user form and the input file to upload de image
	*/
	constructor(private formBuilder: FormBuilder,
		private genericService: GenericService<User>,
		private dialog:MdDialogRef<UserFormDialog>,
		private sharedService: SharedService,
		private imageService: ImageService) {
		this.createForm();
		this.uploader = new FileUploader({url: this.imageService.serverURL + "/upload", itemAlias: 'image'});
		this.uploadMessage = 'Choose Image...';
		this.data = this.getData();
		this.userTypeNgModel = 'user';
		// If the data exists the values of the data are assigned to each NgModel of the form.
		// This is for populating the user form when you want to edit any user.
		if (this.data){
			// This condition is for blocking the username input
			if (this.data.username) {
				this.readOnly = true;
			}
			this.idNgModel = this.data._id;
			this.usernameNgModel = this.data.username;
			this.nameNgModel = this.data.name;
			this.passwordNgModel = this.data.password;
			this.userTypeNgModel = this.data.userType;
			this.confirmNgModel = this.data.password;
			this.imageNgModel = this.data.image;
			this.uploadMessage = (this.data.image) 
								 ? this.data.image.substring(29, this.data.image.length) : 'Choose Image...';
		}
	}

	/**
	This hook checks if the image was correctly uploaded and put its name in the input file.
	Also sets the image filePath in a hidden input in the form to ease the storage in the database the next time.
	*/
	public ngOnInit () {
		this.uploader.onSuccessItem = (item:FileItem,
			response:string, status:number,
			headers:ParsedResponseHeaders) => {
			this.uploadMessage = item._file.name;
			this.userForm.controls['image'].setValue(JSON.parse(response).data.filePath);
			this.fileUploaded = JSON.parse(response).data.filename;
		}
	}

	/*
	This method upload the image. If the form hasn't saved and the image is changed. Then
	remove the current image from the server and add the new image to the server.
	*/
	private uploadImg() {
		if (this.fileUploaded) {
			this.imageService.delete("deleteImg",this.fileUploaded).subscribe(success => {
				return success;
			}, error => {
				return error;
			});
		}
		this.uploader.uploadAll();
	}

	/* This method creates the user form and its validations */
	public createForm() {
		this.userForm = this.formBuilder.group({
			name: ['', Validators.required],
			passwords: this.formBuilder.group({
				password: ['', Validators.required],
				confirm: ['', Validators.required]
			}, { validator: this.passwordMatchValidator }),
			username: ['', Validators.required],
			userType: ['User', Validators.required],
			image: ['']
		})
	}

	/**
	* This method calls a web service called save to store a new user in the database.
	* If the web service throws an ok status then the method will call to the refresh table method and will change any css styles.
	* If the web service throws an error status then the method will show the corresponding error message with its css styles.
	* @param formGroup is the formGroup to Save
	*/
	public onSave(formGroup: FormGroup):any {
		this.user = formGroup.value;
		if(this.data)
			this.user._id = this.idNgModel;
		this.genericService.save(this.user, 'userController').subscribe(
			success => {
				this.message = success.message;
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

	/**
	* This method calls a web service called save to update a user in the database.
	* If the web service throws an ok status then the method will call to the refresh table method and will change any css styles.
	* If the web service throws an error status then the method will show the corresponding error message with its css styles.
	* @param formGroup is the formGroup to Save
	*/
	public onUpdate(formGroup: FormGroup):any {
		this.user = formGroup.value;
		if(this.data)
			this.user._id = this.idNgModel;
		this.user.isModified = this.userForm.get(['passwords','password']).dirty;
		this.genericService.update(this.user, 'userController').subscribe(
			success => {
				this.message = success.message;
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

	/*
		This method calls a shared service that contains the method to update the table
		from users.component.ts
	*/
	private refreshTable() {
		this.sharedService.callComponentMethod();
	}

	/*
	This method get information about the user to show the edit form with the user information preloaded
	in the form.
	*/
	private getData() {
		return this.sharedService.data;
	}

	/**
	* This method validates the password and the confirm password inputs, if the password is valid
	* then the passwords form group will be valid. But if is a distinct case the passwords form group
	* will be invalid and the disable button to save will be true.
	* @param group The group password with the controls password and confirm
	*/
	private passwordMatchValidator(group: FormGroup) {
		return group.get('password').value === group.get('confirm').value
      	? null : {'valid': true};
	}
}
