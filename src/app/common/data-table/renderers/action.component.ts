import { Component, OnInit } from '@angular/core';
import { DataTableRenderer } from './renderer';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionDataTableRendererComponent
  implements OnInit, DataTableRenderer
{
  data: any;
  field: string;

  constructor() {}

  ngOnInit(): void {}
}
