import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-add-scope',
  templateUrl: './add-scope.component.html',
  styleUrls: ['./add-scope.component.scss'],
})
export class AddScopeComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<AddScopeComponent>) {}

  ngOnInit(): void {}

  add(): void {
    if (this.form.valid) {
      const scope: ScopeOfWork = {
        name: this.form.get('name').value as string,
        tasks: [],
      };

      this.dialogRef.close(scope);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
