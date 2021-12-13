import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular Material Modules */
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/* Add Amplify imports */
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

/* internal components */
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { MainComponent } from './layouts/main/main.component';
import { DashboardComponent } from './views/dashboard.component';
import { ProjectsComponent } from './views/projects.component';
import { UserMenuComponent } from './common/user-menu/user-menu.component';
import { UserProfileComponent } from './views/modals/user-profile.component';
import { ChangePasswordComponent } from './views/modals/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    MainComponent,
    DashboardComponent,
    ProjectsComponent,
    UserMenuComponent,
    UserProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    AmplifyAuthenticatorModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
