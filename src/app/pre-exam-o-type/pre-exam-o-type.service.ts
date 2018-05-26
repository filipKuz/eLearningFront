import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";



@Injectable()
export class PreExamOTypeService {

    private readonly path = "/api/pre-exam-obligation-types";

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.path, { observe: 'response' })
    }

    postNewType(newType: any): Observable<any> {
        return this.http.post(this.path, newType);
    }

    changeType(id: number): Observable<any> {
        return this.http.put(this.path + "/" + id, null, {responseType: 'text'});
    }
}