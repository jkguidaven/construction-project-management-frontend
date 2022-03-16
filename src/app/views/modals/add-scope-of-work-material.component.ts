import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScopeOfWorkTaskMaterial } from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-add-scope-of-work-material',
  templateUrl: './add-scope-of-work-material.component.html',
  styleUrls: ['./add-scope-of-work-material.component.scss'],
})
export class AddScopeOfWorkMaterialComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    qty: new FormControl(1, [Validators.required]),
    unit: new FormControl('', [Validators.required]),
    contingency: new FormControl(5, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ScopeOfWorkTaskMaterial,
    private dialogRef: MatDialogRef<AddScopeOfWorkMaterialComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.form.get('name').setValue(this.data.name);
      this.form.get('qty').setValue(this.data.quantity);
      this.form.get('unit').setValue(this.data.unit);
      this.form.get('contingency').setValue(this.data.contingency);
    }
  }

  add(): void {
    if (this.form.valid) {
      const material: ScopeOfWorkTaskMaterial = {
        name: this.form.get('name').value as string,
        quantity: this.form.get('qty').value,
        unit: this.form.get('unit').value,
        contingency: this.form.get('contingency').value,
      };

      this.dialogRef.close(material);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
