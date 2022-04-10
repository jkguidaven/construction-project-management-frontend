import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

export const TASK_API_ENDPOINT = `${environment.serverUrl}/api/tasks`;

@Injectable({
  providedIn: 'root',
})
export class TaskClientApiService {
  constructor(private httpClient: HttpClient) {}

  getTasks(type: 'unassigned' | 'pending' | 'completed'): Observable<Task[]> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .get(`${TASK_API_ENDPOINT}/${type}`, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as Task[]));
      })
    );
  }

  getTask(id: number): Observable<Task> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .get(`${TASK_API_ENDPOINT}/${id}`, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as Task));
      })
    );
  }

  assignTask(task: Task): Observable<boolean> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .post(`${TASK_API_ENDPOINT}/${task.id}/assign`, null, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(
            catchError(() => of(false)),
            map(() => true)
          );
      })
    );
  }

  completeTask(task: Task): Observable<boolean> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .post(`${TASK_API_ENDPOINT}/${task.id}/complete`, null, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(
            catchError(() => of(false)),
            map(() => true)
          );
      })
    );
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
