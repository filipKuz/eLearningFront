import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";



@Injectable()
export class PreExamObligationRecordsService {

    private readonly path = "/api/pre-exam-obligation-records";

    constructor(private http: HttpClient) { }

    getAll(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?term=" +  term + "&page=" + page + "&size=" + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' })
    }

    getAllByStudentAndCourse(sId: number, cId: number): Observable<any> {
        return this.http.get(this.path + "/student"+ "/" + sId + "/" + "course" + "/" + cId, { observe: 'response' })
    }
}