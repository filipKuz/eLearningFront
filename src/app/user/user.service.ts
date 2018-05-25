import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";



@Injectable()
export class UserService {

    private readonly path = "/api/users";

    constructor(private http: HttpClient) { }

    getAll(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?term=" +  term + "&page=" + page + "&size=" + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' })
    }

    getActiveUsers(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "/active?term=" +  term + "&page=" + page + "&size=" + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' })
    }

    getNotActiveUsers(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "/not-active?term=" +  term + "&page=" + page + "&size=" + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' })
    }

    postNewUser(newUser: any): Observable<any> {
        return this.http.post(this.path + "/sign-up", newUser);
    }

    isUsernameUnique(username: string): Observable<any> {
        return this.http.post(this.path + "/username-unique/" + username, null);
    }

    changeUserStatus(id: number): Observable<any> {
        return this.http.put(this.path + "/" + id, null, {responseType: 'text'});
    }
}