import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddMaterialRequestComponent implements OnInit {
  form: FormGroup = new FormGroup({
    project: new FormControl(undefined, [Validators.required]),
    scope: new FormControl(undefined, [Validators.required]),
    task: new FormControl(undefined, [Validators.required]),
  });

  scopes: ScopeOfWork[] = [
    {
      name: 'EARTHWORK',
      tasks: [
        {
          name: 'Demotion Works',
          unit: 'LOT',
          quantity: 1.0,
          subconPricePerUnit: 4,
          materials: [],
        },
        {
          name: 'Excavation Works',
          unit: 'cu.m.',
          quantity: 112.98,
          subconPricePerUnit: 2.3,
          materials: [],
        },
        {
          name: 'Backfilling',
          unit: 'cu.m.',
          quantity: 210.74,
          subconPricePerUnit: 10,
          materials: [],
        },
      ],
    },
    {
      name: 'RETAINING WALL',
      tasks: [
        {
          name: 'Reinforcement Bars',
          materials: [
            {
              name: 'Footing RSB 25mm x 9mm',
              unit: 'pcs',
              quantity: 20.0,
              contingency: 5,
              pricePerUnit: 300,
              subconPricePerUnit: 5,
            },
            {
              name: 'Footing RSB 20mm x 6mm',
              unit: 'pcs',
              quantity: 42.0,
              contingency: 5,
              pricePerUnit: 231.14,
              subconPricePerUnit: 4,
            },
            {
              name: 'Footing RSB 16mm x 6mm',
              unit: 'pcs',
              quantity: 240.0,
              contingency: 5,
              pricePerUnit: 900.2,
              subconPricePerUnit: 4,
            },
          ],
        },
        {
          name: 'Formworks',
          materials: [
            {
              name: 'Phenolic Board 3/4',
              unit: 'pcs',
              quantity: 1,
              contingency: 5,
              pricePerUnit: 1050.12,
              subconPricePerUnit: 4.5,
            },
          ],
        },
      ],
    },
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.form.get('scope').disable();
    this.form.get('task').disable();
    this.form.get('project').valueChanges.subscribe((value) => {
      this.form.get('scope').setValue(undefined);
      if (value) {
        this.form.get('scope').enable();
      } else {
        this.form.get('scope').disable();
      }
    });

    this.form.get('scope').valueChanges.subscribe((value) => {
      this.form.get('task').setValue(undefined);
      if (value) {
        this.form.get('task').enable();
      } else {
        this.form.get('task').disable();
      }
    });
  }

  get tasks(): ScopeOfWorkTask[] {
    if (this.form.get('scope').value) {
      return this.form.get('scope').value.tasks;
    }

    return [];
  }

  get materials(): ScopeOfWorkTaskMaterial[] {
    if (this.form.get('task').value) {
      return this.form.get('task').value.materials;
    }
    return [];
  }
}
