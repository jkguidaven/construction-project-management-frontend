import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewProgressReportComponent implements OnInit {
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
          qty: 1.0,
          subconPricePerUnit: 4,
          materials: [],
        },
        {
          name: 'Excavation Works',
          unit: 'cu.m.',
          qty: 112.98,
          subconPricePerUnit: 2.3,
          materials: [],
        },
        {
          name: 'Backfilling',
          unit: 'cu.m.',
          qty: 210.74,
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
              qty: 20.0,
              contingency: 5,
              pricePerUnit: 300,
              subconPricePerUnit: 5,
            },
            {
              name: 'Footing RSB 20mm x 6mm',
              unit: 'pcs',
              qty: 42.0,
              contingency: 5,
              pricePerUnit: 231.14,
              subconPricePerUnit: 4,
            },
            {
              name: 'Footing RSB 16mm x 6mm',
              unit: 'pcs',
              qty: 240.0,
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
              qty: 1,
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
    this.form.get('project').disable();
    this.form.get('scope').disable();
    this.form.get('task').disable();

    this.form.get('project').setValue('Home remodelling');
    this.form.get('scope').setValue(this.scopes[1]);
    this.form.get('task').setValue(this.scopes[1].tasks[0]);
  }

  get tasks(): ScopeOfWork[] {
    if (this.form.get('scope').value) {
      return this.form.get('scope').value.tasks;
    }

    return [];
  }

  get now(): Date {
    return new Date();
  }
}
