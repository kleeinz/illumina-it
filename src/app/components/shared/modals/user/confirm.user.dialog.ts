import {Component, Inject} from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';
import { GenericService } from '../../../../services/generic.service';
import { SharedService } from '../../../../services/shared.service';
import { User } from '../../../../models/user.model';
import { UsersComponent } from '../../../users/users.component';
@Component({
  selector: 'confirm-user-dialog',
  templateUrl: './confirm.user.dialog.html',
})
export class ConfirmUserDialog {

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
    private genericService: GenericService<User>,
    private dialog: MdDialogRef<ConfirmUserDialog>,
    private sharedService: SharedService) {
  }

  private onDelete() {
    this.genericService.delete(this.data, 'userController').subscribe(
      success => {
        this.dialog.close();
        this.refreshTable();
        return success;
    }, error => {
        return error;
    });
  }

  private refreshTable() {
    this.sharedService.callComponentMethod();
  }

}
