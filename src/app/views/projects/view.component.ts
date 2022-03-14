import { Component, OnInit } from '@angular/core';
import { StatusBarItem } from 'src/app/common/status-bar/status-bar.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewProjectComponent implements OnInit {
  statusBarItems: StatusBarItem[] = [
    {
      label: 'Project Design',
      sub: 'For Architectural Drawing'
    },
    {
      label: 'Cost Estimate'
    },
    {
      label: 'Project Approval'
    },
    {
      label: 'Active / Inprogress'
    },
    {
      label: 'Completion'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
