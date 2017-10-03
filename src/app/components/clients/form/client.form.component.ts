import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Client } from '../../../models/client.model';
import { GenericService } from '../../../services/generic.service';
import { SharedService } from '../../../services/shared.service';
import { MdDialogRef } from '@angular/material';
import { ClientFormDialog } from '../../shared/modals/client/client.form.dialog';

@Component({
	selector: 'client-form',
	templateUrl: 'client.form.component.html',
})
export class ClientFormComponent {
	
	protected client: Client;
	clientForm: FormGroup;
	public message: string;
	public color:String;
	private nameNgModel: string;
	private phoneNgModel: number;
	private marriedNgModel: boolean;
	private genderNgModel: string;
	private ageNgModel: string;
  	private professionNgModel: string;
	private readOnly:boolean;
	private idNgModel:string;
	private data:any;

	constructor(private formBuilder: FormBuilder,
		private genericService: GenericService<Client>,
		private dialog:MdDialogRef<ClientFormDialog>,
		private sharedService: SharedService) {
		this.createForm();
		this.data = this.getData();
		this.marriedNgModel = false;
		this.genderNgModel = 'male';
		// Asigning the client information to the NgModels. It only happens if the data is not null or undefined
		if (this.data){
			if (this.data.name) {
				this.readOnly = true;
			}
			this.idNgModel = this.data._id;
			this.nameNgModel = this.data.name;
			this.phoneNgModel = this.data.phone;
			this.marriedNgModel = this.data.married;
			this.genderNgModel = this.data.gender;
			this.ageNgModel = this.data.age;
     		this.professionNgModel = this.data.profession;
   		}
	}

	/*
		This method creates a new Client Form with all properties corresponding to the Client model
		in the front end.
	*/
	public createForm() {
		this.clientForm = this.formBuilder.group({
			name: ['', Validators.required],
      		phone: ['', Validators.required],
      		married: [false, Validators.required],
      		gender: ['male', Validators.required],
      		age: [0, Validators.required],
      		profession: ['', Validators.required]
		})
	}

	/**
	* This method calls a web service called save to store a new client in the database.
	* If the web service throws an ok status then the method will call to the refresh table method and will change any css styles.
	* If the web service throws an error status then the method will show the corresponding error message with its css styles.
	* @param formGroup is the formGroup to Save
	*/
	public onSave(formGroup: FormGroup):any {
		this.client = formGroup.value;
		if(this.data)
			this.client._id = this.idNgModel;
		this.genericService.save(this.client, 'clientController').subscribe(
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
	* This method calls a web service called save to update a client in the database.
	* If the web service throws an ok status then the method will call to the refresh table method and will change any css styles.
	* If the web service throws an error status then the method will show the corresponding error message with its css styles.
	* @param formGroup is the formGroup to Save
	*/
	public onUpdate(formGroup: FormGroup):any {
		this.client = formGroup.value;
		if(this.data)
			this.client._id = this.idNgModel;
		this.genericService.update(this.client, 'clientController').subscribe(
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
		from clients.component.ts
	*/
	private refreshTable() {
		this.sharedService.callComponentMethod();
	}

	/*
		This method get information about the client to show the edit form with the client information preloaded
		in the form.
	*/
	private getData() {
		return this.sharedService.data;
	}

}
