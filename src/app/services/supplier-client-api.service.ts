import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../models/supplier.model';

const SUPPLIER_API_ENDPOINT = `${environment.serverUrl}/api/suppliers`;

@Injectable({
  providedIn: 'root',
})
export class SupplierClientApiService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Supplier[]> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .get(SUPPLIER_API_ENDPOINT, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(
            map((result) => {
              return result as Supplier[];
            })
          );
      })
    );
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
