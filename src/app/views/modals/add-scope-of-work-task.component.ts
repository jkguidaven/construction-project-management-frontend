import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ScopeOfWorkTask } from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-add-scope-of-work-task',
  templateUrl: './add-scope-of-work-task.component.html',
  styleUrls: ['./add-scope-of-work-task.component.scss'],
})
export class AddScopeOfWorkTaskComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    qty: new FormControl(undefined, []),
    unit: new FormControl('', []),
  });

  constructor(private dialogRef: MatDialogRef<AddScopeOfWorkTaskComponent>) {}

  ngOnInit(): void {}

  add(): void {
    if (this.form.valid) {
      const task: ScopeOfWorkTask = {
        name: this.form.get('name').value as string,
        quantity: this.form.get('qty').value,
        unit: this.form.get('unit').value,
      };

      this.dialogRef.close(task);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
