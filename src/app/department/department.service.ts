import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class DepartmentService {
    
    private readonly path = "/api/departments";

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.path, { observe: 'response' })
    }

    postNewDep(newDepartment: any): Observable<any> {
        return this.http.post(this.path, newDepartment);
    }

    getOne(id:number): Observable<any>{
        return this.http.get(this.path + "/" + id,{ observe: 'response' });
    }

    changeDep(newDepartment:any): Observable<any> {
        return this.http.put(this.path ,newDepartment);
    }

    changeActive(id: number): Observable<any> {
        return this.http.put(this.path + "/" + id, null, {responseType: 'text'});
    }

}