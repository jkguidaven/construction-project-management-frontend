import { Component, Input, OnInit } from '@angular/core';

export interface StatusBarItem {
  label: string;
}

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent implements OnInit {
  @Input() items!: StatusBarItem[];
  @Input() completed: number;
  @Input() sub!: string;

  constructor() {}

  ngOnInit(): void {}
}
