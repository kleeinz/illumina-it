import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { User } from '../../../models/user.model';
import { GenericService } from '../../../services/generic.service';
import { SharedService } from '../../../services/shared.service';
import { ImageService } from '../../../services/image.service';
import { MdDialogRef } from '@angular/material';
import { DialogForm } from '../../shared/modals/dialogForm';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload/ng2-file-upload';

@Component({
	selector: 'user-form',
	templateUrl: 'form.component.html',
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

	constructor(private formBuilder: FormBuilder,
		private genericService: GenericService<User>,
		private dialog:MdDialogRef<DialogForm>,
		private sharedService: SharedService,
		private imageService: ImageService) {
		this.createForm();
		this.uploader = new FileUploader({url: this.imageService.serverURL + "/upload", itemAlias: 'image'});
		this.uploadMessage = 'Choose Image...';
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
			this.imageNgModel = this.data.image;
			this.uploadMessage = (this.data.image) 
								 ? this.data.image.substring(29, this.data.image.length) : 'Choose Image...';
		}
	}

	public ngOnInit () {
		this.uploader.onSuccessItem = (item:FileItem,
			response:string, status:number,
			headers:ParsedResponseHeaders) => {
			this.uploadMessage = item._file.name;
			this.userForm.controls['image'].setValue(JSON.parse(response).data.filePath);
			this.fileUploaded = JSON.parse(response).data.filename;
			console.log("First Image: ", this.fileUploaded);
		}
	}

	private uploadImg() {
		if (this.fileUploaded) {
			console.log("fileUploaded: ", this.fileUploaded);
			this.imageService.delete("deleteImg",this.fileUploaded).subscribe(success => {
				return success;
			}, error => {
				return error;
			});
		}
		this.uploader.uploadAll();
	}

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

	public onUpdate(formGroup: FormGroup):any {
		console.log(JSON.stringify(formGroup.value));
		this.user = formGroup.value;
		if(this.data)
			this.user._id = this.idNgModel;
		this.user.isModified = this.userForm.get(['passwords','password']).dirty;
		console.log("isModified: ", this.user.isModified);
		this.genericService.update<User>(this.user, 'userController').subscribe(
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

	private passwordMatchValidator(group: FormGroup) {
		return group.get('password').value === group.get('confirm').value
      	? null : {'valid': true};
	}
}
