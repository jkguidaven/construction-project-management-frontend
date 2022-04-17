import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { from, map, mergeMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TargetSchedule } from '../models/target-schedule.model';

export const PROJECT_API_ENDPOINT = `${environment.serverUrl}/api/projects`;

@Injectable({
  providedIn: 'root',
})
export class ScheduleProjectClientApiService {
  constructor(private httpClient: HttpClient) {}

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }

  define(
    projectId: number,
    commands: TargetSchedule[]
  ): Observable<TargetSchedule[]> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .post(
            `${PROJECT_API_ENDPOINT}/${projectId}/target-schedules`,
            { commands },
            {
              headers: {
                Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
              },
            }
          )
          .pipe(map((result) => result as TargetSchedule[]));
      })
    );
  }

  get(projectId: number): Observable<TargetSchedule[]> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .get(`${PROJECT_API_ENDPOINT}/${projectId}/target-schedules`, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as TargetSchedule[]));
      })
    );
  }
}
