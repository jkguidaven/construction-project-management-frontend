import { Component, Input, OnInit } from '@angular/core';
import { DataTableRenderer } from './renderer';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextDataTableRendererComponent
  implements OnInit, DataTableRenderer
{
  @Input() data: any;
  @Input() field: string;

  constructor() {}

  ngOnInit(): void {}
}
