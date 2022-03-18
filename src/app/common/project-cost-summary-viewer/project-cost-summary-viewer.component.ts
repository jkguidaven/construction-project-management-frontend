import { Component, Input, OnInit } from '@angular/core';
import {
  ScopeOfWork,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-project-cost-summary-viewer',
  templateUrl: './project-cost-summary-viewer.component.html',
  styleUrls: ['./project-cost-summary-viewer.component.scss'],
})
export class ProjectCostSummaryViewerComponent implements OnInit {
  @Input() scopes!: ScopeOfWork[];
  @Input() contractorPrice!: number;

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
    return this.scopes.reduce(
      (total, scope) => total + this.getSubTotal(scope),
      0
    );
  }
}
