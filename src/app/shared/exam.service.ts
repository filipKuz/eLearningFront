import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class ExamService {

    private readonly path = "api/exams";

    constructor(private http: HttpClient) { }

    getAll(page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?searchTerm=" + term + "&page=" + page + "&size="
            + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' });
    }

    getByTerm(termMonth: number, page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?termMonth=" + termMonth + "&searchTerm=" + term + "&page=" + page + "&size="
            + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' });
    }

    getByStudentAndTerm(studentId: number, termMonth: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?studentId=" + studentId + "&termMonth=" + termMonth + "&searchTerm=" + term + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' });
    }

    getByProfessorAndTerm(professorUsername: string, termMonth: number, page: number, size: number, sortParam: string, sortDirection: string, term: string): Observable<any> {
        return this.http.get(this.path + "?professorUsername=" + professorUsername + "&termMonth=" + termMonth + "&searchTerm=" + term + "&page=" + page + "&size="
            + size + "&sort=" + sortParam + "," + sortDirection, { observe: 'response' });
    }

    createNewExam(exam: any): Observable<any> {
        return this.http.post(this.path, exam);
    }

    updateExam(exam: any): Observable<any> {
        return this.http.put(this.path, exam);
    }
}
