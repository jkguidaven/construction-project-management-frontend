import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular Material Modules */
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

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


/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent, SidenavComponent, MainComponent, DashboardComponent, ProjectsComponent, UserMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    AmplifyAuthenticatorModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
