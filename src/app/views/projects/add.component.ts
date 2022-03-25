import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddProjectComponent implements OnInit {
  hasExistingDesignControl: FormControl = new FormControl();

  constructor() {}

  ngOnInit(): void {}
}
