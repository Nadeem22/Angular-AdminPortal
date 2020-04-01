import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Book } from "../models/book";
import { API_URL } from "../app.constants";

@Injectable({
  providedIn: "root"
})
export class BookListService {
  constructor(private http: HttpClient) {}

  getBook() {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("xAuthToken")
    });
    return this.http.get<Book[]>(`${API_URL}/book/bookList`, { headers });
  }
}
