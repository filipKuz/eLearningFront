import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
  


@Injectable()
export class UserService {

    private readonly path = "/api/users";

    constructor(private http: HttpClient) {}

    getAll():Observable<any> {
        return this.http.get(this.path);
    }


}