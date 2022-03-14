import { Component, OnInit } from '@angular/core';
import { GroupTask } from 'src/app/common/charts/gantt-chart/gantt-chart.component';

@Component({
  selector: 'app-view-project-schedule',
  templateUrl: './view-project-schedule.component.html',
  styleUrls: ['./view-project-schedule.component.scss'],
})
export class ViewProjectScheduleComponent implements OnInit {
  startDate: Date = new Date(2022, 3, 5);
  endDate: Date = new Date(2023, 3, 5);
  tasks: GroupTask[] = [
    {
      label: 'Earthwork',
      tasks: [
        {
          id: 1,
          label: 'Demolition Work',
          dates: [
            {
              from: new Date(2022, 3, 5),
              to: new Date(2022, 4, 5),
              progress: 0,
            },
            {
              from: new Date(2022, 4, 6),
              to: new Date(2022, 5, 6),
              progress: 0,
            },
          ],
        },
        {
          id: 1,
          label: 'Excavation Work',
          dates: [
            {
              from: new Date(2022, 3, 15),
              to: new Date(2022, 4, 15),
              progress: 0,
            },
            {
              from: new Date(2022, 4, 16),
              to: new Date(2022, 5, 16),
              progress: 0,
            },
          ],
        },
        ,
        {
          id: 1,
          label: 'Backfilling',
          dates: [
            {
              from: new Date(2022, 3, 15),
              to: new Date(2022, 4, 1),
              progress: 0,
            },
            {
              from: new Date(2022, 4, 1),
              to: new Date(2022, 4, 16),
              progress: 0,
            },
            {
              from: new Date(2022, 4, 16),
              to: new Date(2022, 5, 16),
              progress: 0,
            },
          ],
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
