import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AllDocumentsService {

  private readonly urlNuxeoPath: string = "/nuxeo/";
  private readonly urlDocPath: string = "/api/e-document/";

  constructor(private http: HttpClient) { }

}
