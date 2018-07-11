import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserProfileService {

  private readonly path = "/api/users"

  constructor(private http: HttpClient) { }


  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  uploadImage(file: any, username:string, isImage: boolean) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.path + "/upload" + "/" + username + "/" + isImage, formData, { responseType: 'text' });
  }

  putUser(id: number, user: any): Observable<any> {
    return this.http.put(this.path + "/edit/" + id, user);
  }

  editPassword(oldPassword: string, newPassword: string, confirmedPassword: string, id: number): Observable<any> {
    return this.http.put(this.path + "/editPassword/" + id,
      JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword, confirmedPassword: confirmedPassword }),
      { headers: this.headers, responseType: 'text' });
  }

  isUserLoggedInByUsername(id: number): Observable<any> {
    return this.http.get(this.path + "/is-user-logged-by-username/" + id);
  }

}
