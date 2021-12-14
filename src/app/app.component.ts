import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './views/modals/change-password.component';
import { UserProfileComponent } from './views/modals/user-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'greyhammer-construction-erp-system';

  constructor(private dialog: MatDialog) {}

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
}
