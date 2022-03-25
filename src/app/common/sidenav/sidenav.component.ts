import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Auth from '@aws-amplify/auth';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() expand: boolean = false;
  @Output() expandChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  groups: any[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadRolesAndMenu();
  }

  async loadRolesAndMenu(): Promise<void> {
    const user = await Auth.currentAuthenticatedUser();
    this.groups = user.signInUserSession.accessToken.payload['cognito:groups'];
  }

  toggle(): void {
    this.expandChange.emit(!this.expand);
  }

  get menuItems(): any[] {
    const list = [{ label: 'Dashboard', icon: 'home', link: '/dashboard' }];

    if (this.groups && this.groups.indexOf('admin') > -1) {
      list.push({ label: 'Projects', icon: 'dashboard', link: '/projects' });
    }

    if (this.groups && this.hasTaskModule(this.groups))
      list.push({ label: 'Tasks', icon: 'assignment', link: '/tasks' });

    return list;
  }

  hasTaskModule(groups: string[]) {
    const hasTaskGroups = [
      'ce',
      'qs',
      'procurement',
      'design',
      'operation',
      'stakeholder',
      'accounting',
    ];
    for (let group of groups) {
      if (hasTaskGroups.indexOf(group) > -1) return true;
    }
    return false;
  }

  isActiveView(path: string): boolean {
    return this.router.url.startsWith(path);
  }
}
