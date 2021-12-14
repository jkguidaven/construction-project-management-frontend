import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Storage } from 'aws-amplify';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  @Input() user: any;
  @Output() signout: EventEmitter<any> = new EventEmitter();
  @Output() changePassword: EventEmitter<any> = new EventEmitter();
  @Output() profile: EventEmitter<any> = new EventEmitter();

  constructor() {}
}
