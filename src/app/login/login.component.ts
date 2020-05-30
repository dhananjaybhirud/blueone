import { Component, OnInit } from '@angular/core';
import { LoggedinService } from '../logged-in.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean;

  loginForm: FormGroup;
  loading = false;
    submitted = false;

  constructor(
    public loggedInService: LoggedinService,
    public router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  logIn(): void {
    this.loggedInService.login()
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        const redirect = this.loggedInService.redirectUrl ? this.loggedInService.redirectUrl :
            '/pos';
        this.router.navigate([redirect]);
    });
  }


  logout(): void {
    this.loggedInService.logout()
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        this.router.navigate(['/']);
      });
  }

  onSubmit(){
   console.log(this.loginForm);
   this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    } else{
      this.logIn();
    }
  }

}
