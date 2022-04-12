import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { from, map, mergeMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScopeOfWork } from '../models/scope-of-work.model';

export const PROJECT_API_ENDPOINT = `${environment.serverUrl}/api/projects`;

@Injectable({
  providedIn: 'root',
})
export class ScopeOfWorkClientApiService {
  constructor(private httpClient: HttpClient) {}

  define(projectId: number, scopes: ScopeOfWork[]): Observable<ScopeOfWork[]> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .post(
            `${PROJECT_API_ENDPOINT}/${projectId}/scope-of-work/define`,
            { scopes },
            {
              headers: {
                Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
              },
            }
          )
          .pipe(map((result) => result as ScopeOfWork[]));
      })
    );
  }

  get(projectId: number): Observable<ScopeOfWork[]> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .get(`${PROJECT_API_ENDPOINT}/${projectId}/scope-of-work`, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as ScopeOfWork[]));
      })
    );
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
