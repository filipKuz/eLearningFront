import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class CourseService {


    private readonly path = "/api/courses";

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.path, { observe: 'response' })
    }


    getOne(id: number): Observable<any> {
        return this.http.get(this.path + "/" + id, { observe: 'response' });
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.path + "/" + id, { observe: 'response' });
    }

    postNewCourse(newCourse: any): Observable<any> {
        return this.http.post(this.path, newCourse);
    }

}