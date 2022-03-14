import { Component, Input, OnInit } from '@angular/core';

export interface GroupTask {
  label: string;
  tasks: Task[];
}

export interface Task {
  id: any;
  label: string;
  dates: TaskDuration[];
}

export interface TaskDuration {
  from: Date;
  to: Date;
  progress: number;
}

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
})
export class GanttChartComponent implements OnInit {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() tasks: GroupTask[];

  constructor() {}

  ngOnInit(): void {}

  getMonthString(month: number): string {
    return [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ][month];
  }

  get sections() {
    const yearStart = this.startDate.getFullYear();
    const yearMonthStart = this.startDate.getMonth();
    const yearEnd = this.endDate.getFullYear();
    const yearMonthEnd = this.endDate.getMonth();

    const getRange = (start: number, end: number) => {
      const range = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      return range;
    };

    const years = [];

    for (let i = yearStart; i <= yearEnd; i++) {
      years.push({
        label: i,
        sub: getRange(
          i === yearStart ? yearMonthStart : 0,
          i === yearEnd ? yearMonthEnd : 11
        ),
      });
    }

    return years;
  }
}
