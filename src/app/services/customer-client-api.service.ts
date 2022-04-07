import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from 'src/environments/environment';
import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

const CUSTOMER_API_ENDPOINT = `${environment.serverUrl}/api/customers`;

@Injectable({
  providedIn: 'root',
})
export class CustomerClientApiService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient
          .get(CUSTOMER_API_ENDPOINT, {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          })
          .pipe(
            map((result) => {
              return result as Customer[];
            })
          );
      })
    );
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
