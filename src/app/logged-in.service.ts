import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { delay, tap } from 'rxjs/operators';

@Injectable()
export class LoggedinService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  redirectUrl: string;
  // temp;

  constructor(private router: Router) {
    if(localStorage.getItem('loggedIn')){
      if(localStorage.getItem('loggedIn') == 'true' ) {
        this.isLoggedIn.next(true)
      } else{
        this.isLoggedIn.next(false)
      }
    }
    //  console.log(this.isLoggedIn.value);
   }

  login(): Observable<boolean> {
    this.isLoggedIn.next(true);
    localStorage.setItem('loggedIn', this.isLoggedIn.value.toString());
    // console.log(this.temp);
    // console.log(this.isLoggedIn);
    return this.isLoggedIn$;
  }

  logout(): Observable<boolean> {
    this.isLoggedIn.next(false);
    localStorage.removeItem('loggedIn');
    return this.isLoggedIn$;
  }

}
