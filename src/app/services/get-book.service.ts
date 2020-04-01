import { API_URL } from "./../app.constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book } from "../models/book";

@Injectable({
  providedIn: "root"
})
export class GetBookService {
  constructor(private http: HttpClient) {}
  getBook(id) {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("xAuthToken")
    });
    return this.http.get<Book>(`${API_URL}/book/${id}`, { headers });
  }
}
