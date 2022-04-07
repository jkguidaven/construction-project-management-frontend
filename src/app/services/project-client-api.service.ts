import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';

export const PROJECT_API_ENDPOINT = `${environment.serverUrl}/api/projects`;

@Injectable({
  providedIn: 'root',
})
export class ProjectClientApiService {
  constructor(private httpClient: HttpClient) {}

  add(project: Project): Observable<Project> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .post(PROJECT_API_ENDPOINT, project, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as Project));
      })
    );
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
