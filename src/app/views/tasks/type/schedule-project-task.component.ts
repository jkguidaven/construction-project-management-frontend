import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  GroupTask,
  Task,
  TaskDuration,
} from 'src/app/common/charts/gantt-chart/gantt-chart.component';
import { ScopeOfWork } from 'src/app/models/scope-of-work.model';
import { AddProjectScheduleComponent } from '../../modals/add-project-schedule.component';

@Component({
  selector: 'app-schedule-project-task',
  templateUrl: './schedule-project-task.component.html',
  styleUrls: ['./schedule-project-task.component.scss'],
})
export class ScheduleProjectTaskComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date(2023, 3, 5);
  groupTasks: GroupTask[] = [];

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

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.groupTasks = this.scopes.map((scope) => {
      const tasks: Task[] = scope.tasks.map((task) => ({
        id: task.name,
        label: task.name,
        dates: [],
      }));

      return {
        label: scope.name,
        tasks,
      };
    });
  }

  showAddProjectScheduleForm(): void {
    const dialogRef = this.dialog.open(AddProjectScheduleComponent, {
      width: '90%',
      data: this.scopes,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const group = this.groupTasks.find(
          ({ label }) => data.scope.name === label
        );

        if (group) {
          const task = group.tasks.find(({ id }) => data.task.name === id);

          console.log({ task, data });

          if (task) {
            task.dates.push({
              from: data.from,
              to: data.to,
              progress: 0,
            });
          }
        }
      }
    });
  }
}
