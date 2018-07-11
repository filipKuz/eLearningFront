import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";



@Injectable()
export class ExamRecordsService {

    private readonly path = "/api/exams-student-records";

    constructor(private http: HttpClient) { }

    getAll(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?term=" + term + "&page=" + page + "&size=" + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' });
    }

    getAllByCourse(id: number): Observable<any> {
        return this.http.get(this.path + "/course/" + id, { observe: 'response' });
    }

    gradeRecords(reccords: any): Observable<any> {
        console.log("test");
        console.log(reccords);
        return this.http.post(this.path + "/grade", reccords, { observe: 'response' });
    }

    getAllByStudentAndCourse(studentUsername: string, courseId: number): Observable<any>{
        return this.http.get(this.path + "/by-student-course?studentUsername=" + studentUsername + "&courseId=" + courseId);
    }
}
