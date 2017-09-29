import {Component, Inject, ViewChild, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';
import { UserFormComponent } from '../../users/form/form.component';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'dialogForm',
  templateUrl: './dialogForm.html',
})
export class DialogForm implements AfterViewInit {

  @ViewChild(UserFormComponent) UserFormComponent: UserFormComponent;

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
      this.UserFormComponent.onUpdate(this.UserFormComponent.userForm);
    else
      this.UserFormComponent.onSave(this.UserFormComponent.userForm);

    
  }
}
