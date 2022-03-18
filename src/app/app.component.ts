import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from './views/modals/change-password.component';
import { UserProfileComponent } from './views/modals/user-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'greyhammer-construction-erp-system';

  constructor(private dialog: MatDialog, private router: Router) {}

  changePassword(): void {
    this.dialog.open(ChangePasswordComponent, {
      maxWidth: '600px',
      width: '100%',
      disableClose: true,
    });
  }

  viewProfile(): void {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      maxWidth: '800px',
      width: '100%',
      panelClass: 'profile-modal',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      // TO-DO
    });
  }

  hasGroup(user: any): boolean {
    return Boolean(
      user.signInUserSession.accessToken.payload['cognito:groups']
    );
  }

  signout(callback: any): void {
    callback();
    this.router.navigate(['/']);
  }
}
