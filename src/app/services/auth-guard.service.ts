import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(private _authService: AuthService, private router: Router) {}

// to guard child routes
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;
    // if user detail is available, we asume user is loggedIn
    const isLoggedIn = !!this._authService.getUserDetail();
    // if user is loggedIn and trying to access login page, they will be redirected to dashboard
    if (url === "/login" && isLoggedIn) {
      this.router.navigateByUrl("/dashboard");
    } 
    // if user is not loggedIn and not in login page, they will be redirected to login
    else if (url !== "/login" && !isLoggedIn) {
      this.router.navigateByUrl("/login");
    } else {
      return true;
    }
  }
}
