import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddPurchaseOrderComponent implements OnInit {
  lines: any[] = [{}];

  constructor(public router: Router) {}

  ngOnInit(): void {}

  addLine(): void {
    this.lines.push({
      description: 'item 1',
    });

    console.log(this.lines);
  }
}
