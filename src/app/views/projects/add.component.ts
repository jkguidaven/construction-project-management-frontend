import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, Observable } from 'rxjs';
import { FileUpload } from 'src/app/common/upload-file-dropbox/upload-file-dropbox.component';
import { Customer } from 'src/app/models/customer.model';
import { Project } from 'src/app/models/project.model';
import { CustomerClientApiService } from 'src/app/services/customer-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddProjectComponent implements OnInit {
  customers$!: Observable<Customer[]>;

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    customer: new FormControl(null, [Validators.required]),
    address1: new FormControl(),
    address2: new FormControl(),
    city: new FormControl(),
    postal: new FormControl(),
    province: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    hasExistingDesign: new FormControl(null, [Validators.required]),
  });

  uploads: FileUpload[] = [];

  processing!: boolean;

  constructor(
    private customerClientAPI: CustomerClientApiService,
    private projectClientAPI: ProjectClientApiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.customers$ = this.customerClientAPI.getAll();
    this.form.get('customer').valueChanges.subscribe(() => {
      const selected: Customer | string = this.form.get('customer').value;
      if (selected instanceof Object) {
        this.form.get('address1').setValue(selected.address1);
        this.form.get('address2').setValue(selected.address2);
        this.form.get('city').setValue(selected.city);
        this.form.get('postal').setValue(selected.postal);
        this.form.get('province').setValue(selected.province);
        this.form.get('phone').setValue(selected.phone);
        this.form.get('email').setValue(selected.email);

        this.form.get('address1').disable();
        this.form.get('address2').disable();
        this.form.get('city').disable();
        this.form.get('postal').disable();
        this.form.get('province').disable();
        this.form.get('phone').disable();
        this.form.get('email').disable();
      } else {
        this.form.get('address1').setValue('');
        this.form.get('address2').setValue('');
        this.form.get('city').setValue('');
        this.form.get('postal').setValue('');
        this.form.get('province').setValue('');
        this.form.get('phone').setValue('');
        this.form.get('email').setValue('');

        this.form.get('address1').enable();
        this.form.get('address2').enable();
        this.form.get('city').enable();
        this.form.get('postal').enable();
        this.form.get('province').enable();
        this.form.get('phone').enable();
        this.form.get('email').enable();
      }
    });
  }

  displayFn(customer: Customer): string {
    return customer ? customer.name : '';
  }

  submit(): void {
    if (!this.submittable) return;

    this.processing = true;
    const selectedCustomer = this.form.get('customer').value;
    const customer: Customer =
      selectedCustomer instanceof Object
        ? selectedCustomer
        : {
            name: selectedCustomer,
            address1: this.form.get('address1').value,
            address2: this.form.get('address2').value,
            city: this.form.get('city').value,
            postal: this.form.get('postal').value,
            province: this.form.get('province').value,
            phone: this.form.get('phone').value,
            email: this.form.get('email').value,
          };

    const project: Project = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      customer,
      hasExistingDesign: this.form.get('hasExistingDesign').value,
    };

    this.projectClientAPI
      .add(project)
      .pipe(
        catchError(() => {
          this.processing = false;
          return null;
        })
      )
      .subscribe((project: Project) => {
        if (project) {
          if (project.hasExistingDesign) {
          } else {
            this.redirectToProject(project.id);
          }
        }
      });
  }

  filterCustomer(customers: Customer[]): Customer[] {
    return customers
      ? customers.filter(({ name }) => {
          const selected = this.form.get('customer').value;
          return !(selected instanceof Object) && selected
            ? name.toLowerCase().indexOf(selected.toLowerCase()) > -1
            : false;
        })
      : [];
  }

  redirectToProject(id: number) {
    this.router.navigate(['/projects', id]);
  }

  get submittable(): boolean {
    if (this.processing) {
      return false;
    }

    if (!this.form.valid) {
      return false;
    }

    if (this.form.get('hasExistingDesign').value && this.uploads.length === 0) {
      return false;
    }

    return true;
  }
}
