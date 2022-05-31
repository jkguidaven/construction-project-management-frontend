import { Component, Input, OnInit } from '@angular/core';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';

@Component({
  selector: 'app-project-schedule-viewer',
  templateUrl: './project-schedule-viewer.component.html',
  styleUrls: ['./project-schedule-viewer.component.scss'],
})
export class ProjectScheduleViewerComponent implements OnInit {
  @Input() scopes!: ScopeOfWork[];

  constructor() {}

  ngOnInit(): void {}

  hasMaterials(scope: ScopeOfWork): boolean {
    if (scope.tasks.length) {
      return Boolean(scope.tasks.find((task) => task.materials.length));
    }

    return false;
  }

  getSubTotal(scope: ScopeOfWork): number {
    let total = 0;
    for (let task of scope.tasks) {
      if (task.subconPricePerUnit && task.qty) {
        total += task.subconPricePerUnit * task.qty;
      }

      for (let material of task.materials) {
        if (material.pricePerUnit && material.qty) {
          total += material.pricePerUnit * material.qty;
        }

        if (material.subconPricePerUnit && material.qty) {
          total += material.subconPricePerUnit * material.qty;
        }
      }
    }

    return total;
  }

  getSubcon(scope: ScopeOfWork): number {
    return scope.subconPrice;
  }

  get grandTotal(): number {
    let total = 0;

    for (let scope of this.scopes) {
      total += this.getSubTotal(scope);

      if (this.getSubcon(scope)) {
        total += this.getSubcon(scope);
      }
    }

    return total;
  }
}
