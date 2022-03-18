import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ScopeOfWork,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-stakeholder-approval-task',
  templateUrl: './stakeholder-approval-task.component.html',
  styleUrls: ['./stakeholder-approval-task.component.scss'],
})
export class StakeholderApprovalTaskComponent implements OnInit {
  profitControl: FormControl = new FormControl(0, []);
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

  constructor() {}

  ngOnInit(): void {}

  getMaterialCost(scope: ScopeOfWork): number {
    let materials: ScopeOfWorkTaskMaterial[] = [];

    for (let task of scope.tasks) {
      materials = [...materials, ...task.materials];
    }

    return materials.reduce((total, material) => {
      if (material.pricePerUnit && material.quantity) {
        total += material.pricePerUnit * material.quantity;
      }
      return total;
    }, 0);
  }

  getLaborCost(scope: ScopeOfWork): number {
    let total = 0;

    for (let task of scope.tasks) {
      if (task.subconPricePerUnit && task.quantity) {
        total += task.subconPricePerUnit * task.quantity;
      }

      for (let material of task.materials) {
        if (material.quantity && material.subconPricePerUnit) {
          total += material.quantity * material.subconPricePerUnit;
        }
      }
    }

    return total;
  }

  getSubTotal(scope: ScopeOfWork): number {
    return this.getLaborCost(scope) + this.getMaterialCost(scope);
  }

  get grandTotal(): number {
    return (
      this.scopes.reduce((total, scope) => total + this.getSubTotal(scope), 0) +
      (this.profitControl.value ?? 0)
    );
  }
}
