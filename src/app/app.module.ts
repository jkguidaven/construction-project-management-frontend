import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Add Amplify imports */
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { MainComponent } from './layouts/main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './views/dashboard.component';
import { ProjectsComponent } from './views/projects.component';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent, SidenavComponent, MainComponent, DashboardComponent, ProjectsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    AmplifyAuthenticatorModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
