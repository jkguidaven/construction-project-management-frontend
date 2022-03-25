import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableRenderer } from './renderer';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkDataTableRendererComponent
  implements OnInit, DataTableRenderer
{
  data: any;
  field: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirect(): void {
    this.router.navigate(this.data['link']);
  }
}
