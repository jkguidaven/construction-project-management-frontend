import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import {
  ScopeOfWork,
  ScopeOfWorkTask,
} from 'src/app/models/scope-of-work.model';
import { TargetSchedule } from 'src/app/models/target-schedule.model';

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
})
export class GanttChartComponent implements OnInit {
  @Input() scopes: ScopeOfWork[];
  @Input() schedules: TargetSchedule[];
  @Output() select: EventEmitter<TargetSchedule> = new EventEmitter();

  dividerGap: number = 200;

  collapsedToggle: Record<number, boolean> = {};

  @Input() colorScheme: string[] = [
    '#2DB6F5',
    '#FFC107',
    '#FF8A65',
    '#E289F2',
    '#39C86A',
  ];

  constructor() {}

  ngOnInit(): void {}

  get startDate(): Date {
    if (this.schedules.length) {
      let lowestDate = null;

      for (let schedule of this.schedules) {
        if (!lowestDate || lowestDate.getTime() > schedule.start.getTime()) {
          lowestDate = schedule.start;
        }
      }

      return lowestDate;
    } else {
      return new Date();
    }
  }

  get endDate(): Date {
    const nextYear = moment(this.startDate).add(7, 'month').toDate();

    let highestDate: Date = null;
    for (let schedule of this.schedules) {
      if (!highestDate || highestDate.getTime() < schedule.end.getTime()) {
        highestDate = schedule.end;
      }
    }

    return highestDate
      ? highestDate.getTime() > nextYear.getTime()
        ? highestDate
        : nextYear
      : nextYear;
  }

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

  getScheduleColor(task: ScopeOfWorkTask): string {
    const tasks = this.scopes.reduce((arr, scope) => {
      scope.tasks.forEach((item) => {
        arr.push(item);
      });
      return arr;
    }, []);

    let index = tasks.findIndex((match) => match.id === task.id);
    return this.colorScheme[index % this.colorScheme.length];
  }

  getSchedulePosByDate(start: Date, size: number, isHead: boolean): number {
    const year = start.getFullYear();
    const month = start.getMonth();
    const day = start.getDate() + (isHead ? -1 : 1);
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

  getScheduleWidth(schedule: TargetSchedule, size: number): number {
    const start = this.getSchedulePosByDate(schedule.start, size, true);
    const end = this.getSchedulePosByDate(schedule.end, size, false);
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

  getSchedules(task: ScopeOfWorkTask): TargetSchedule[] {
    return this.schedules.filter(
      (schedule) => schedule.taskId === task.id && schedule.type !== 'DELETE'
    );
  }

  get totalWidth(): number {
    return this.sections.reduce((total, section) => {
      return total + section.sub.length * this.dividerGap;
    }, 0);
  }
}
