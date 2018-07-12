import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";



@Injectable()
export class PreExamObligationRecordsService {

    private readonly path = "/api/pre-exam-obligation-records";

    constructor(private http: HttpClient) { }

    getAll(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?term=" + term + "&page=" + page + "&size=" + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' })
    }

    getAllByStudentAndCourse(uName: string, cId: number): Observable<any> {
        return this.http.get(this.path + "/student" + "/" + uName + "/" + "course" + "/" + cId, { observe: 'response' })
    }
    
    getAllByPreExamObligation(id: number, sortParam: string, sortDirection: string): Observable<any> {
        return this.http.get(this.path + "/preexamobligation/" + id + "/sortpar/" + sortParam + "/sortdir/" + sortDirection , { observe: 'response' })
    }
    setObligationDate(id: number, year: number, month: number, day: number): Observable<any> {
        return this.http.post(this.path + "/create-records" + "/" + id + "/" + year + "/" + month + "/" + day, null , { observe: 'response' })
    }

    getPoints(uName: string, courseId: number): Observable<any>{
        return this.http.get(this.path + "/points/student/" + uName + "/course/" + courseId, {observe: 'response'})
    }

    gradeRecords(reccords: any): Observable<any> {
        return this.http.post(this.path + "/grade", reccords, { observe: 'response' });
    }
}