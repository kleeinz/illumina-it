import {Component, Inject, ViewChild, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';
import { ClientFormComponent } from '../../../clients/form/client.form.component';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'client-form-dialog',
  templateUrl: './client.form.dialog.html',
})
export class ClientFormDialog implements AfterViewInit{

  @ViewChild(ClientFormComponent) ClientFormComponent: ClientFormComponent;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, private sharedService: SharedService, private cd: ChangeDetectorRef) {
  	if(data) {
      this.sharedService.data = data;
    }
  }

  ngAfterViewInit() {
      this.cd.detectChanges();
  }

  public onSubmit() {
    if(this.data)
      this.ClientFormComponent.onUpdate(this.ClientFormComponent.clientForm);
    else
      this.ClientFormComponent.onSave(this.ClientFormComponent.clientForm);
  }
}
