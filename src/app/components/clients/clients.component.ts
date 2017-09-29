import { Component, OnInit } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal";
import { GenericService } from '../../services/generic.service';
import { SharedService } from '../../services/shared.service';
import { Client } from '../../models/client.model';
import { MdDialog } from '@angular/material';
import { DialogClientForm } from '../shared/modals/dialogClientForm';
import { ConfirmClientDialog } from '../shared/modals/confirmClient';
import { FilterDataTablePipe } from '../shared/pipes/filter-datatable.pipe';
import { HidePasswordPipe } from '../shared/pipes/hide-password.pipe';

@Component({
	selector: 'clients',
	templateUrl: 'clients.component.html',
})
export class ClientsComponent implements OnInit {
	private clients: Array<Client>;
	public filterInput:string;
  private isAdmin:boolean;

	constructor(public dialog: MdDialog,
		private dialogService: DialogService,
		private genericService: GenericService<Client>,
	  private sharedService: SharedService) {
			this.sharedService.componentMethodCalled.subscribe(
        () => {
          this.populateDatatable();
        }
      );
	}

	public ngOnInit() {
		let userStorage = localStorage.getItem("userLogged");
    if (userStorage && JSON.parse(userStorage).user.userType === 'admin') {
        this.isAdmin = true;
    }  
    this.populateDatatable();
	}

	private onSave() {
				this.sharedService.data = null;
        const dialogRef = this.dialog.open(DialogClientForm, {
            height: '600px',
            width: '400px'
        });
  }

  private onEdit(client: Client) {
        const dialogRef = this.dialog.open(DialogClientForm, {
            height: '600px',
            width: '400px',
            data: {
							'_id': client._id,
							'name': client.name,
							'phone': client.phone,
							'married': client.married,
							'gender': client.gender,
							'age': client.age,
							'profession': client.profession
            }
        });
  }

  private confirm(client: Client) {
        const dialogRef = this.dialog.open(ConfirmClientDialog, {
            height: '200px',
            width: '500px',
						data: {
								'client': client
						}
        })
  }

  private populateDatatable():any {
    	this.genericService.find<Client>('clientController').subscribe(success => {
				this.clients = success.data as Client[];
    		return success.data;
    	}, error => {
    		return error;
    	});
  }

}
