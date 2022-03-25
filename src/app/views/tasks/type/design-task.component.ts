import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-design-task',
  templateUrl: './design-task.component.html',
  styleUrls: ['./design-task.component.scss'],
})
export class DesignTaskComponent implements OnInit {
  statusControl: FormControl = new FormControl();

  constructor(public router: Router) {}

  ngOnInit(): void {}
}
