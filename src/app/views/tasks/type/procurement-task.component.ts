import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
  ScopeOfWorkTaskMaterial,
} from 'src/app/models/scope-of-work.model';
import { Task } from 'src/app/models/task.model';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { AddScopeOfWorkMaterialPriceComponent } from '../../modals/add-scope-of-work-material-price.component';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-procurement-task',
  templateUrl: './procurement-task.component.html',
  styleUrls: ['./procurement-task.component.scss'],
})
export class ProcurementTaskComponent implements OnInit, TaskHandler {
  @Input() task: Task;

  scopes: ScopeOfWork[] = [
    {
      name: 'EARTHWORK',
      tasks: [
        {
          name: 'Demotion Works',
          unit: 'LOT',
          qty: 1.0,
          materials: [],
        },
        {
          name: 'Excavation Works',
          unit: 'cu.m.',
          qty: 112.98,
          materials: [],
        },
        {
          name: 'Backfilling',
          unit: 'cu.m.',
          qty: 210.74,
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
            },
            {
              name: 'Footing RSB 20mm x 6mm',
              unit: 'pcs',
              qty: 42.0,
              contingency: 5,
            },
            {
              name: 'Footing RSB 16mm x 6mm',
              unit: 'pcs',
              qty: 240.0,
              contingency: 5,
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
            },
          ],
        },
      ],
    },
  ];

  constructor(
    private dialog: MatDialog,
    public router: Router,
    private taskClientAPI: TaskClientApiService
  ) {}

  ngOnInit(): void {}

  addPrice(material: ScopeOfWorkTaskMaterial): void {
    const dialogRef = this.dialog.open(AddScopeOfWorkMaterialPriceComponent, {
      data: material,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        material.pricePerUnit = data.pricePerUnit;
      }
    });
  }

  getTotalMaterialCost(task: ScopeOfWorkTask): number {
    return task.materials.reduce((total, material) => {
      return (
        total +
        (material.pricePerUnit && material.qty
          ? material.pricePerUnit * material.qty
          : 0)
      );
    }, 0);
  }

  setTask(task: Task): void {
    this.task = task;
  }

  complete() {
    this.taskClientAPI.completeTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
