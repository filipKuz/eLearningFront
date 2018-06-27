import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';

@Injectable()
export class ExamService {

    private readonly path = "api/exams";

    constructor(private http: HttpClient) { }

    getAll(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?searchTerm=" + term + "&page=" + page + "&size="
            + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' });
    }

    getOne(id: number): Observable<any> {
        return this.http.get(this.path + "/" + id, { observe: 'response' });
    }

    getByProfessorAndCourse(professorUsername: string, courseId: number): Observable<any> {
        return this.http.get(this.path + "/by-professor-course?professorUsername=" + professorUsername + "&courseId=" + courseId, { observe: 'response' });
    }

    createNewExam(exam: any): Observable<any> {
        return this.http.post(this.path, exam);
    }

    updateExam(exam: any): Observable<any> {
        return this.http.put(this.path, exam);
    }

    deleteExam(examId: number): Observable<any> {
        return this.http.delete(this.path + "/" + examId);
    }

    setExamDate(id: number, year: number, month: number, day: number) {
        return this.http.post(this.path + "/exam-date" + "/" + id + "/" + year + "/" + month + "/" + day, null);
    }
}
