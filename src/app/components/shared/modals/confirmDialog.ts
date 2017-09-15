import {Component, Inject, ViewChild} from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'confirmDialog',
  templateUrl: './confirmDialog.html',
})
export class ConfirmDialog {

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {

  }


}
