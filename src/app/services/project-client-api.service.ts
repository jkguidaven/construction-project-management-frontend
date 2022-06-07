import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable } from 'rxjs';
import { Project, ProjectPageResult } from '../models/project.model';
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

  get(id: number): Observable<Project> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .get(`${PROJECT_API_ENDPOINT}/${id}`, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as Project));
      })
    );
  }

  setDesignStatus(id: number, status: string): Observable<Project> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .put(
            `${PROJECT_API_ENDPOINT}/${id}/design-status`,
            { status },
            {
              headers: {
                Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
              },
            }
          )
          .pipe(map((result) => result as Project));
      })
    );
  }

  approve(
    id: number,
    asApprover: string,
    payload: any = {}
  ): Observable<Project> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .post(
            `${PROJECT_API_ENDPOINT}/${id}/${asApprover}/approve`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
              },
            }
          )
          .pipe(map((result) => result as Project));
      })
    );
  }

  reject(id: number, asRejector: string): Observable<Project> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .post(`${PROJECT_API_ENDPOINT}/${id}/${asRejector}/reject`, null, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as Project));
      })
    );
  }

  getAll(
    page: number = 0,
    size: number = 25,
    sortBy: string,
    sortDir: string
  ): Observable<ProjectPageResult> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        let query = `page=${page}&size=${size}`;

        if (sortBy) {
          query += `&sortBy=${sortBy}`;

          if (sortDir === 'desc') {
            query += '&desc';
          }
        }

        return this.httpClient
          .get(`${PROJECT_API_ENDPOINT}?${query}`, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as ProjectPageResult));
      })
    );
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
