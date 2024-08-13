import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-snippet-popup',
  templateUrl: './snippet-popup.component.html',
  styleUrl: './snippet-popup.component.css'
})
export class SnippetPopupComponent {
  readonly dialogRef = inject(MatDialogRef<SnippetPopupComponent>);
  readonly data = inject<{ content: string }>(MAT_DIALOG_DATA);
  constructor() {
  }
}
