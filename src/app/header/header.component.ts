import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  loggedInUser: string = "";

  constructor(private _authService: AuthService, private router: Router) {
    this._authService.onLogin.subscribe((username) => {
      this.loggedInUser = username;
    });
  }

  ngOnInit(): void {
    this.loggedInUser = this._authService.getUserDetail();
  }

  // when user will logout we are redirecting user back to login page
  public logout() {
    this._authService.logout();
    this.loggedInUser = "";
    this.router.navigateByUrl("/login");
  }
}
