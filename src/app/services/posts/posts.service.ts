import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.dataUrl).pipe(
      retry(3),
      delay(400), // Add a 500ms delay to simulate network latency
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<Post[]> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something went wrong. Please try again later.')
    );
  }
}
