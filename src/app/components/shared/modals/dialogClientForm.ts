import {Component, Inject, ViewChild} from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';
import { ClientFormComponent } from '../../clients/form/clientForm.component';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'dialogClientForm',
  templateUrl: './dialogClientForm.html',
})
export class DialogClientForm {

  @ViewChild(ClientFormComponent) ClientFormComponent: ClientFormComponent;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, private sharedService: SharedService) {
  	if(data) {
      console.log("data: ", data);
      this.sharedService.data = data;
    }
  }

  public onSubmit() {
    if(this.data)
      this.ClientFormComponent.onUpdate(this.ClientFormComponent.clientForm);
    else
      this.ClientFormComponent.onSave(this.ClientFormComponent.clientForm);
  }
}
