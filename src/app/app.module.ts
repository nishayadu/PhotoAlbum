import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { AlbumDataServiceService } from "./services/album-data.service";
import { AlbumGridViewComponent } from "./album-grid-view/album-grid-view.component";
import { HttpClientModule } from "@angular/common/http";
import { AlbumCardViewComponent } from "./album-card-view/album-card-view.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';

// routes having login and dashboard as a child route and using authguard for the child routes
const routes: Routes = [
  {
    path: "",
    canActivateChild: [AuthGuardService],
    children: [
      { path: "", redirectTo: "/login", pathMatch: "full" },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    AlbumGridViewComponent,
    AlbumCardViewComponent,
    FavoriteButtonComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService, AlbumDataServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
