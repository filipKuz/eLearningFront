import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";



@Injectable()
export class ProfessorTypeService {

    private readonly path = "/api/professor_types";

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.path, { observe: 'response' })
    }

    postNewType(newType: any): Observable<any> {
        return this.http.post(this.path, newType);
    }

    getOne(id:number): Observable<any>{
        return this.http.get(this.path + "/" + id,{ observe: 'response' });
    }

    editType(type:any): Observable<any> {
        return this.http.put(this.path ,type);
    }

    changeActive(id: number): Observable<any> {
        return this.http.delete(this.path + "/" + id, {responseType: 'text'});
    }
}