import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CountdonwEndTimeService {

  constructor() { }

  countdown(endTime: string): Observable<number> {
    const endDate = new Date(endTime);
    return new Observable(observer => {
      return interval(1000).pipe(
        map(x => {
          const now = new Date();
          const remainingSeconds = Math.floor((endDate.getTime() - now.getTime()) / 1000);
          if (remainingSeconds < 0) {
            observer.complete();
          }
          return remainingSeconds;
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
