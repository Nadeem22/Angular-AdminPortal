import { LoginService } from "./../../services/login.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private credential = { username: "", password: "" };
  private loggedIn = false;
  private token: string;
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      Response => {
        this.loggedIn = true;
      },
      error => {
        console.log("in eroor==>" + error);
        this.loggedIn = false;
      }
    );
  }
  onSubmit() {
    this.loginService
      .sendCredential(this.credential.username, this.credential.password)
      .subscribe(
        response => {
          console.log(response);
          let data = response;
          this.token = data["token"];
          localStorage.setItem("xAuthToken", this.token);
          this.loggedIn = true;
          console.log("isloggedIn Value logincomponenet" + this.loggedIn);
          location.reload();
        },
        error => {
          console.log("error came in api" + error);
        }
      );
  }
}
