import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";



@Injectable()
export class PreExamObligationervice {

    private readonly path = "/api/pre-exam-obligations";

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.path, { observe: 'response' })
    }

    postNewObligation(newType: any): Observable<any> {
        return this.http.post(this.path, newType);
    }

    getOne(id:number): Observable<any>{
        return this.http.get(this.path + "/" + id,{ observe: 'response' });
    }

    changeObligation(type:any): Observable<any> {
        return this.http.put(this.path ,type);
    }

    changeActive(id: number): Observable<any> {
        return this.http.put(this.path + "/" + id, null, {responseType: 'text'});
    }

    getAllByCourse(cId: number): Observable<any> {
        return this.http.get(this.path + "/" + "course" + "/"+ cId, { observe: 'response' })
    }

    setObligationDate(id: number, model:any): Observable<any>{
        return this.http.post(this.path + "/" + "setDate" + "/"+ id, model)
    }
}