import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';
import { Task } from 'src/app/models/task.model';
import { TaskClientApiService } from 'src/app/services/task-client-api.service';
import { TaskHandler } from './task-handler';

@Component({
  selector: 'app-client-approval-task',
  templateUrl: './client-approval-task.component.html',
  styleUrls: ['./client-approval-task.component.scss'],
})
export class ClientApprovalTaskComponent implements OnInit, TaskHandler {
  @Input() task!: Task;

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

  constructor(
    public router: Router,
    private taskClientAPI: TaskClientApiService
  ) {}

  ngOnInit(): void {}

  setTask(task: Task): void {
    this.task = task;
  }

  complete() {
    this.taskClientAPI.completeTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
