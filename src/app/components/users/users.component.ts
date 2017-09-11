import { Component } from '@angular/core';
import { ModalComponent } from '../shared/modals/modal.component';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
	selector: 'users',
	templateUrl: 'users.component.html',
})
export class UsersComponent {
	constructor(private dialogService: DialogService) {}

	private showConfirm() {
            let disposable = this.dialogService.addDialog(ModalComponent,);
    }
}