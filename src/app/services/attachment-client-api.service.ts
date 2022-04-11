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

        if (attachment.task && attachment.task.id)
          data.append('taskId', `${attachment.task.id}`);

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

  deleteAttachment(projectId: number, id: number): Observable<any> {
    return this.getAuth().pipe(
      mergeMap((auth: CognitoUserSession) => {
        return this.httpClient.delete(
          `${PROJECT_API_ENDPOINT}/${projectId}/attachments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
            },
          }
        );
      })
    );
  }

  downloadAttachment(projectId: number, attachment: Attachment): void {
    this.getAuth()
      .pipe(
        mergeMap((auth: CognitoUserSession) => {
          return this.httpClient.get(
            `${PROJECT_API_ENDPOINT}/${projectId}/attachments/${attachment.id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.getIdToken().getJwtToken()}`,
              },
              responseType: 'blob',
            }
          );
        })
      )
      .subscribe((response) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute('download', attachment.name);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  private getAuth(): Observable<CognitoUserSession> {
    return from(Auth.currentSession());
  }
}
