import { LoginService } from "./../../services/login.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  private loggedIn = false;

  constructor(private loginService: LoginService, private router: Router) {}

  logout() {
    this.loginService.logout().subscribe(
      response => {
        console.log("LoggedOut");
        localStorage.removeItem("xAuthToken");
        location.reload();
      },
      error => {
        console.log("Some Error" + error);
      }
    );
    this.router.navigate(["/"]);
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      Response => {
        console.log("in Response navbarcomponent==>" + Response);
        this.loggedIn = true;
      },
      error => {
        console.log("in eroor navbarcomponent==>" + error);
        this.loggedIn = false;
      }
    );
  }
  toggleDisplay() {
    this.loggedIn = !this.loggedIn;
  }
}
