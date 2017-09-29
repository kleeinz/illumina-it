import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Client } from '../../../models/client.model';
import { GenericService } from '../../../services/generic.service';
import { SharedService } from '../../../services/shared.service';
import { MdDialogRef } from '@angular/material';
import { DialogClientForm } from '../../shared/modals/dialogClientForm';

@Component({
	selector: 'client-form',
	templateUrl: 'clientForm.component.html',
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
		private dialog:MdDialogRef<DialogClientForm>,
		private sharedService: SharedService) {
		this.createForm();
		this.data = this.getData();
		this.marriedNgModel = false;
		this.genderNgModel = 'male';
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

	public onSave(formGroup: FormGroup):any {
		this.client = formGroup.value;
		if(this.data)
			this.client._id = this.idNgModel;
		this.genericService.save<Client>(this.client, 'clientController').subscribe(
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

	public onUpdate(formGroup: FormGroup):any {
		this.client = formGroup.value;
		if(this.data)
			this.client._id = this.idNgModel;
		this.genericService.update<Client>(this.client, 'clientController').subscribe(
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

	private refreshTable() {
		this.sharedService.callComponentMethod();
	}

	private getData() {
		return this.sharedService.data;
	}

}
