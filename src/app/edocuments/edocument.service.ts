import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EdocumentService {

  private readonly urlNuxeoPath: string = "/api/nuxeo/";
  private readonly urlDocPath: string = "/api/e-document/";

  constructor(private http: HttpClient) { }

  //isResourceDocument(poslednja var) je rucno ubaceno
  getNuxeoResourceById(id: string): Observable<any> {
    return this.http.get(this.urlNuxeoPath + "document-request/" + id + "/" + true);
  }

  uploadImage(file: any, username:string) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.urlNuxeoPath + "upload" + "/" + username, formData, { responseType: 'text' });
  }

  uploadDocument(file: any, id:number) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.urlNuxeoPath + "upload-document" + "/" + id, formData, { responseType: 'text' });
  }

  getDocumentsByUserId(id:number): Observable<any> {
    return this.http.get(this.urlDocPath + id);
  }

  getAllDocuments(): Observable<any> {
    return this.http.get(this.urlDocPath);
  }



}
