import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  API_URL: string = "http://localhost:8181";
  constructor(private http: HttpClient) {}
  sendCredential(username: string, password: string) {
    console.log("Invoking Api-------->" + username + ":" + password);
    //let url = "http://localhost:8181/token";
    // let encodedCredentials = btoa(username + ":" + password);

    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password);

    // let basicHeader = "Basic " + encodedCredentials;
    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthHeaderString
    });

    return this.http.get(`${this.API_URL}/token`, { headers });
  }

  checkSession() {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("xAuthToken")
    });
    return this.http.get(`${this.API_URL}/checkSession`, { headers });
  }
  logout() {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("xAuthToken")
    });
    return this.http.post(`${this.API_URL}/user/logout`, " ", { headers });
  }
}
