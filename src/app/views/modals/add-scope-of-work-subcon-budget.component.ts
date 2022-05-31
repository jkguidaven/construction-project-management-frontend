import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-add-scope-of-work-subcon-budget',
  templateUrl: './add-scope-of-work-subcon-budget.component.html',
  styleUrls: ['./add-scope-of-work-subcon-budget.component.scss'],
})
export class AddScopeOfWorkSubconBudgetComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(undefined, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ScopeOfWork,
    private dialogRef: MatDialogRef<AddScopeOfWorkSubconBudgetComponent>
  ) {}

  ngOnInit(): void {
    this.form.get('name').disable();

    this.form.get('name').setValue(this.data.name);
    this.form.get('price').setValue(this.data.subconPrice);
  }

  add(): void {
    if (this.form.valid) {
      const scope: ScopeOfWork = {
        ...this.data,
        subconPrice: this.form.get('price').value,
      };

      this.dialogRef.close(scope);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
