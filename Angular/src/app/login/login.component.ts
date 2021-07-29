import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string = ''
  color: String = ''
  return: string = '';
  fieldErrors: string[] = []

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  userModel = new User("", "")

  handleReset() {
    this.msg = ""
    this.fieldErrors = []
  }

  // handle the login process
  handleLogin() {    
    // process-login
    this.authService.login(this.userModel)
      .subscribe(
        // if login was successful
        data => {
          this.msg = "User is logged in";
          this.color = "text-info";
          this.authService.setSession(data);
          this.router.navigateByUrl("home");
        },
        // if login failed, display the error
        error => {
          this.fieldErrors = JSON.parse(error.error).fieldErrors;
          if(this.fieldErrors == null){
            console.log("Service is down, please try again later...");
          }
        }
      );
    
  }

}
