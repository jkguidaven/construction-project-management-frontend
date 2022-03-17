import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScopeOfWorkTaskMaterial } from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-add-scope-of-work-material-price',
  templateUrl: './add-scope-of-work-material-price.component.html',
  styleUrls: ['./add-scope-of-work-material-price.component.scss'],
})
export class AddScopeOfWorkMaterialPriceComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    qty: new FormControl(1, [Validators.required]),
    unit: new FormControl('', [Validators.required]),
    price: new FormControl(undefined, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ScopeOfWorkTaskMaterial,
    private dialogRef: MatDialogRef<AddScopeOfWorkMaterialPriceComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.form.get('name').disable();
      this.form.get('qty').disable();
      this.form.get('unit').disable();

      this.form.get('name').setValue(this.data.name);
      this.form.get('qty').setValue(this.data.quantity);
      this.form.get('unit').setValue(this.data.unit);
      this.form.get('price').setValue(this.data.pricePerUnit);
    }
  }

  add(): void {
    this.dialogRef.close({
      ...this.data,
      pricePerUnit: this.form.get('price').value,
    });
  }

  close() {
    this.dialogRef.close();
  }

  get total() {
    const quantity = this.form.get('qty').value as number;
    const price = this.form.get('price').value as number;
    return price ? quantity * price : 0;
  }
}
