import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, Observable } from 'rxjs';
import { MaterialRequest } from 'src/app/models/material-request.model';
import { Project, ProjectPageResult } from 'src/app/models/project.model';
import { Supplier } from 'src/app/models/supplier.model';
import { Task } from 'src/app/models/task.model';
import { MaterialRequestClientApiService } from 'src/app/services/material-request-client-api.service';
import { ProjectClientApiService } from 'src/app/services/project-client-api.service';
import { SupplierClientApiService } from 'src/app/services/supplier-client-api.service';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddPurchaseOrderComponent implements OnInit {
  suppliers$!: Observable<Supplier[]>;
  projects: Project[] = [];
  task!: Task;
  request: MaterialRequest;

  lines: any[] = [
    {
      itemControl: new FormControl(),
      quantityControl: new FormControl(0),
      priceControl: new FormControl(0),
    },
  ];

  form: FormGroup = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    term: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    supplier: new FormControl(null, [Validators.required]),
    address1: new FormControl(),
    address2: new FormControl(),
    city: new FormControl(),
    postal: new FormControl(),
    province: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    deliveryDate: new FormControl(),
    deliveryAddress: new FormControl(),
  });

  processing: boolean;

  constructor(
    public router: Router,
    private supplierClientAPI: SupplierClientApiService,
    private projectClientAPI: ProjectClientApiService,
    private taskClientAPI: TaskClientApiService,
    private activatedRoute: ActivatedRoute,
    private materialRequestClientAPI: MaterialRequestClientApiService
  ) {}

  ngOnInit(): void {
    const taskId = this.activatedRoute.snapshot.queryParams['task'];

    if (taskId) {
      this.processing = true;
      this.taskClientAPI
        .getTask(taskId)
        .pipe(
          catchError((err) => {
            this.processing = false;
            throw err;
          })
        )
        .subscribe((task: Task) => {
          this.task = task;

          this.materialRequestClientAPI
            .get(task.materialRequest.id)
            .pipe(finalize(() => (this.processing = false)))
            .subscribe((request) => {
              this.request = request;
            });
        });
    }

    this.projectClientAPI
      .getAll(0, 1000, 'id', 'asc')
      .subscribe((result: ProjectPageResult) => {
        this.projects = result.results;
      });

    this.suppliers$ = this.supplierClientAPI.getAll();
    this.form.get('supplier').valueChanges.subscribe(() => {
      const selected: Supplier | string = this.form.get('supplier').value;
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

  addLine(): void {
    this.lines.push({
      quantityControl: new FormControl(0),
      priceControl: new FormControl(0),
    });
  }

  filterSupplier(suppliers: Supplier[]): Supplier[] {
    return suppliers
      ? suppliers.filter(({ name }) => {
          const selected = this.form.get('supplier').value;
          return !(selected instanceof Object) && selected
            ? name.toLowerCase().indexOf(selected.toLowerCase()) > -1
            : false;
        })
      : [];
  }

  displayFn(supplier: Supplier): string {
    return supplier ? supplier.name : '';
  }
}
