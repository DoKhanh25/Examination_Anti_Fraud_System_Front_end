import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Watermarking2Service {

  constructor() { }
  toBits(s: any) {
    const bits = [];
    for (const c of s) {
      bits.push(c.charCodeAt().toString(2));
    }
  
    return bits;
  }
  

}
