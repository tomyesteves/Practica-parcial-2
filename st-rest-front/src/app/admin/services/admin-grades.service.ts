import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { IGrade } from 'src/interfaces/IGrade';

@Injectable({
  providedIn: 'root'
})
export class AdminGradesService {

  private apiUrl: string = 'http://127.0.0.1:3000/admin/grades';

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getGrades(): Observable<IGrade[]> {
    return this.httpClient.get<IGrade[]>(this.apiUrl)
      .pipe(
        tap(_ => console.log('fetched grades'))
      );
  }

  updateGrade(grade: IGrade): Observable<any> {
    return this.httpClient.put(this.apiUrl, grade, this.httpOptions).pipe(
      tap(_ => console.log(`updated grade id=${grade.id}`))
    );
  }

  addGrade(grade: IGrade): Observable<IGrade> {
    return this.httpClient.post<IGrade>(this.apiUrl, grade, this.httpOptions).pipe(
      tap((newHero: IGrade) => console.log(`added grade w/ id=${newHero.id}`))
    );
  }

  deleteGrade(id: number | undefined): Observable<IGrade> {
    const url = `${this.apiUrl}/${id}`;

    return this.httpClient.delete<IGrade>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted grade id=${id}`))
    );
  }

  redirectToForm() {
    this.router.navigate(['/admin/form']);
  }
}
