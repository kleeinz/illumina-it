import {Component, Inject, ViewChild} from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';
import { UserFormComponent } from '../../users/form/form.component';

@Component({
  selector: 'dialogForm',
  templateUrl: './dialogForm.html',
})
export class DialogForm {

  @ViewChild(UserFormComponent) UserFormComponent: UserFormComponent; 

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
  	if(data) console.log(data);
  }

  public save() {
    this.UserFormComponent.onSave(this.UserFormComponent.userForm);
  }
}
