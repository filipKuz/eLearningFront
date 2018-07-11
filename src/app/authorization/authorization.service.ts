import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import decode from 'jwt-decode';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthorizationService {

    private readonly authUrl = "/login";

    private headers = new HttpHeaders();

    constructor(private http: HttpClient) { }


    login(userName: string, userPassword: string): Observable<boolean> {
        return this.http.post(this.authUrl, JSON.stringify({ username: userName, password: userPassword }), { observe: 'response' })
            .map((response: HttpResponse<any>) => {
                console.log(response);
                let token = response.headers.has("Authorization");
                console.log("token: " + token);
                if (token) {
                    localStorage.setItem('currentUser', JSON.stringify({ userName: userName, token: response.headers.get('Authorization') }));
                    return true;
                } else {
                    return false;
                }
            }).catch((error: any) => {
                if (error.status === 401) {
                    return Observable.throw('Ilegal login');
                } else {
                    return Observable.throw(error.json().error || 'Server error');
                }
            });
    }

    getToken(): string {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        return token ? token : "";
    }

    getUser(): string {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var user = currentUser && currentUser.userName;
        return user ? currentUser.userName : "";
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isAuthenticated(): boolean {
        const token: string = this.getToken();
        return tokenNotExpired(null, token);
    }

    isLoggedIn(): boolean {
        var token: string = this.getToken();
        return token && token.length > 0;
    }

}