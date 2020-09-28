import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";
  public message: string = "";

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // calling to authenticate user, if success,redirecting user to dashboard and if error is encountered showing the error message
  public login(): void {
    this._authService.authenticateUser(this.username, this.password).subscribe(
      (data: string) => {
        this.router.navigateByUrl("/dashboard");
      },
      (error) => {
        this.message = error;
      }
    );
  }

  //when user enter wrong password error message is displayed, and when re-enter the correct details, clearing the error message
  public clearMessage() {
    this.message = "";
  }
}
