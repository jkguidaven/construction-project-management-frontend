import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projectData: any[] = [
    {
      "name": "Draft",
      "value": 8940000
    },
    {
      "name": "Active",
      "value": 5000000
    },
    {
      "name": "Overdue",
      "value": 7200000
    },
      {
      "name": "Completed",
      "value": 6200000
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
