import { Component, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { UserFormComponent } from '../../users/form/form.component';
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    templateUrl: './modal.component.html',
})
export class ModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  @ViewChild(UserFormComponent) UserFormComponent: UserFormComponent; 
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  confirm() {
    this.UserFormComponent.onSubmit(this.UserFormComponent.userForm);
  }
}