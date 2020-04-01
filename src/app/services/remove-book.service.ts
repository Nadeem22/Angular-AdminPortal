import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { API_URL } from "../app.constants";

@Injectable({
  providedIn: "root"
})
export class RemoveBookService {
  constructor(private http: HttpClient) {}

  sendBook(bookId: number) {
    console.log("deleteBookService");
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("xAuthToken")
    });
    return this.http.delete(`${API_URL}/book/remove/${bookId}`, {
      headers
    });
  }
}
