import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataTableRenderer } from './renderer';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateDataTableRendererComponent
  implements OnInit, DataTableRenderer
{
  data: any;
  field: string;

  constructor() {}

  ngOnInit(): void {}

  get display(): string {
    return moment(this.data['field']).format('MM-DD-YYYY');
  }
}
