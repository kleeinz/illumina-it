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
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    //console.log("Hello what do you do?" + JSON.stringify(this.UserFormComponent.userForm.value));
  
    this.UserFormComponent.onSubmit(this.UserFormComponent.userForm);
  }
}