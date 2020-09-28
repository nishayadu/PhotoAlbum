import { Injectable, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  @Output() onLogin = new EventEmitter<string>();
  constructor(private _router: Router) {}

  // to authenticate user when they login with username and password
  public authenticateUser(username: string, password: string) {
    // mocking login API
    const loginPromise = new Promise((resolve, reject) => {
      if (username === "user1" && password === "pa$$w0rd") {
        // setting value in local storage, so that is user is already logged in they will be redirected to dashboard page
        localStorage.setItem("currentUser", username);
        resolve(username);
        // if user is valid we are emitting username to display it in header
        this.onLogin.emit(username);
      } else {
        reject("Invalid username or password.");
      }
    });

    // converting promise to observable using rxjs 'from'
    const observable = from(loginPromise);
    return observable;
  }

  // getting value from the local storage, to check if user already loggedIn
  public getUserDetail() {
    return localStorage.getItem("currentUser");
  }

  // removing item from local storage if user logout
  public logout() {
    localStorage.removeItem("currentUser");
  }
}
