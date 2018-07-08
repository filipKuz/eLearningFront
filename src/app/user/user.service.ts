import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

    private readonly path = "/api/users";

    constructor(private http: HttpClient) { }

    getUserById(id:number) {
        return this.http.get(this.path + "/" + id);
    }

    getAll(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?term=" + term + "&page=" + page + "&size=" + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' });
    }

    getAllForPayments(): Observable<any> {
        return this.http.get(this.path + "/users_payments")
    }

    getActiveUsers(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "/active?term=" + term + "&page=" + page + "&size=" + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' });
    }

    getNotActiveUsers(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "/not-active?term=" + term + "&page=" + page + "&size=" + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' });
    }

    postNewUser(newUser: any): Observable<any> {
        return this.http.post(this.path + "/sign-up", newUser);
    }

    isUsernameUnique(username: string, edit: string, oldUsername: string): Observable<any> {
        return this.http.post(this.path + "/username-unique/" + username + "/" + edit + "/" + oldUsername, null);
    }

    changeUserStatus(id: number): Observable<any> {
        return this.http.put(this.path + "/" + id, null, { responseType: 'text' });
    }
}
