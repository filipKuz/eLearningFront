import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) { }

  private readonly path = "/api/roles";

  getAllRoles(): Observable<any> {
    return this.http.get(this.path);
  }

}
