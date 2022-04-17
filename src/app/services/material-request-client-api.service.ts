import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { from, map, mergeMap, Observable } from 'rxjs';
import {
  MaterialRequest,
  MaterialRequestItem,
  MaterialRequestPageResult,
} from '../models/material-request.model';

const MATERIAL_REQUEST_API_ENDPOINT = `${environment.serverUrl}/api/material-requests`;

@Injectable({
  providedIn: 'root',
})
export class MaterialRequestClientApiService {
  constructor(private httpClient: HttpClient) {}

  get(id: number): Observable<MaterialRequest> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .get(`${MATERIAL_REQUEST_API_ENDPOINT}/${id}`, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as MaterialRequest));
      })
    );
  }

  getAll(
    page: number = 0,
    size: number = 25,
    sortBy: string,
    sortDir: string
  ): Observable<MaterialRequestPageResult> {
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
          .get(`${MATERIAL_REQUEST_API_ENDPOINT}?${query}`, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(map((result) => result as MaterialRequestPageResult));
      })
    );
  }

  create(request: MaterialRequest): Observable<MaterialRequest> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .post(
            MATERIAL_REQUEST_API_ENDPOINT,
            {
              projectId: request.project.id,
              taskId: request.task.id,
              items: request.items.map((item: MaterialRequestItem) => {
                return {
                  materialId: item.material.id,
                  qty: item.qty,
                };
              }),
            },
            {
              headers: {
                Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
              },
            }
          )
          .pipe(map((result) => result as MaterialRequest));
      })
    );
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
