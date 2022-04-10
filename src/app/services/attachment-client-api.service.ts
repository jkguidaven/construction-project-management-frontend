import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable } from 'rxjs';
import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Attachment } from '../models/attachment.model';

const PROJECT_API_ENDPOINT = `${environment.serverUrl}/api/projects`;

@Injectable({
  providedIn: 'root',
})
export class AttachmentClientApiService {
  constructor(private httpClient: HttpClient) {}

  uploadAttachment(projectId: number, attachment: Attachment): Observable<any> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        const data = new FormData();
        data.append('file', attachment.file);
        data.append('name', attachment.name);
        data.append('type', attachment.type);

        return this.httpClient.post(
          `${PROJECT_API_ENDPOINT}/${projectId}/attachments`,
          data,
          {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
            reportProgress: true,
            observe: 'events',
          }
        );
      })
    );
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
