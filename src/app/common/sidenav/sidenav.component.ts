import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() expand: boolean = false;
  @Output() expandChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggle(): void {
    this.expandChange.emit(!this.expand);
  }

  get menuItems(): any[] {
    // TO-DO should be pulled based from role
    return [
      { label: 'Dashboard', icon: 'home', link: '/dashboard' },
      { label: 'Projects', icon: 'dashboard', link: '/projects' },
    ];
  }

  isActiveView(path: string): boolean {
    return this.router.url.startsWith(path);
  }
}
