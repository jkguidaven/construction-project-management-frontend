import { Component, Input, OnInit } from '@angular/core';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
} from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-project-schedule-viewer',
  templateUrl: './project-schedule-viewer.component.html',
  styleUrls: ['./project-schedule-viewer.component.scss'],
})
export class ProjectScheduleViewerComponent implements OnInit {
  @Input() scopes!: ScopeOfWork[];

  constructor() {}

  ngOnInit(): void {}

  getSubTotal(scope: ScopeOfWork): number {
    let total = 0;
    for (let task of scope.tasks) {
      if (task.subconPricePerUnit && task.quantity) {
        total += task.subconPricePerUnit * task.quantity;
      }

      for (let material of task.materials) {
        if (material.pricePerUnit && material.quantity) {
          total += material.pricePerUnit * material.quantity;
        }

        if (material.subconPricePerUnit && material.quantity) {
          total += material.subconPricePerUnit * material.quantity;
        }
      }
    }

    return total;
  }

  get grandTotal(): number {
    let total = 0;

    for (let scope of this.scopes) {
      total += this.getSubTotal(scope);
    }

    return total;
  }

  getTotalMaterialCost(task: ScopeOfWorkTask): number {
    return task.materials.reduce((total, material) => {
      return total + (material.pricePerUnit * material.quantity ?? 0);
    }, 0);
  }

  getTotalLaborCost(task: ScopeOfWorkTask): number {
    return task.materials.reduce((total, material) => {
      return total + (material.subconPricePerUnit * material.quantity ?? 0);
    }, 0);
  }
}
