import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

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

  dividerGap: number = 200;

  @Input() colorScheme: string[] = [
    '#2DB6F5',
    '#FFC107',
    '#FF8A65',
    '#E289F2',
    '#39C86A',
  ];

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

  getTaskColor(index: number): string {
    return this.colorScheme[index % this.colorScheme.length];
  }

  getTaskPosByDate(from: Date, size: number): number {
    const year = from.getFullYear();
    const month = from.getMonth();
    const day = from.getDay() + 1;
    const sections = this.sections;

    const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
    let i = 0;

    for (let section of sections) {
      if (section.label === year) {
        for (let sub of section.sub) {
          if (sub === month) {
            break;
          } else {
            i++;
          }
        }

        break;
      } else {
        i += section.sub.length;
      }
    }

    const offset = (size / daysInMonth) * day;
    return i * size + offset;
  }

  getTaskWidth(task: TaskDuration, size: number): number {
    const start = this.getTaskPosByDate(task.from, size);
    const end = this.getTaskPosByDate(task.to, size);
    return end - start;
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
