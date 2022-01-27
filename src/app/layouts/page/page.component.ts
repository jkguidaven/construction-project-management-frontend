import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
