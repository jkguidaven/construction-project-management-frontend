import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class FormRowComponent implements OnInit {
  @Input() description!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
