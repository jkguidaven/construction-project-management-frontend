import { Component, OnInit } from '@angular/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  hasAccess: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.getAuth().subscribe((session) => {
      const groups = session.getIdToken().payload['cognito:groups'];
      this.hasAccess = groups.indexOf('admin') > -1;
    });
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
