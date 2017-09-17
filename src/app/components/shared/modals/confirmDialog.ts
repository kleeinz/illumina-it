import {Component, Inject, ViewChild} from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';
import { GenericService } from '../../../services/generic.service';
import { User } from '../../../models/user.model';
@Component({
  selector: 'confirmDialog',
  templateUrl: './confirmDialog.html',
})
export class ConfirmDialog {

  constructor(@Inject(MD_DIALOG_DATA) public data: any, private genericService: GenericService<User>) {
  }

  private onDelete() {
    console.log("OnDelete", this.data);
    this.genericService.delete(this.data, 'userController').subscribe(
      success => {
        console.log(success);
        return success;
    }, error => {
        console.log(error);
        return error;
    });
  }

}
