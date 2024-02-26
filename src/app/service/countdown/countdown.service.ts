import { Injectable } from '@angular/core';
import { Observable, interval, map, take, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {

  constructor() { }
  countdown(seconds: number): Observable<number> {
    return new Observable(observer => {
      return interval(1000).pipe(
        take(seconds),
        map(x => {
          const remaining = seconds - x;
          return remaining;
        })
      ).subscribe({
        next: value => observer.next(value),
        complete: () => {
          observer.complete();
        }
      });
    });
  }
}
