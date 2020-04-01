import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book } from "../models/book";
import { API_URL } from "../app.constants";

@Injectable({
  providedIn: "root"
})
export class EditBookService {
  constructor(private http: HttpClient) {}
  sendBook(book: Book) {
    console.log("in send book");
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("xAuthToken")
    });
    return this.http.post<Book>(`${API_URL}/book/update`, book, { headers });
  }
}
