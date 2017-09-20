import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';
import { GenericService } from '../../../services/generic.service';
import { SharedService } from '../../../services/shared.service';
import { Client } from '../../../models/client.model';
import { ClientsComponent } from '../../clients/clients.component';
@Component({
  selector: 'confirmClientRemove',
  templateUrl: './confirmClient.html',
})
export class ConfirmClientDialog {

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
    private genericService: GenericService<Client>,
    private dialog: MdDialogRef<ConfirmClientDialog>,
    private sharedService: SharedService) {
  }

  private onDelete() {
    console.log("OnDelete", this.data);
    this.genericService.delete(this.data, 'clientController').subscribe(
      success => {
        console.log(success);
        this.dialog.close();
        this.refreshTable();
        return success;
    }, error => {
        console.log(error);
        return error;
    });
  }

  private refreshTable() {
    console.log("Executing refresh table");
    this.sharedService.callComponentMethod();
  }

}
