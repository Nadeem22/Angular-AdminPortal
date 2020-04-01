import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "../app.constants";
import { Book } from "../models/book";

@Injectable({
  providedIn: "root"
})
export class AddBookService {
  uploadFile(currentFileUpload: File, response: Object) {
    throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient) {}
  sendBook(book) {
    let headers = new HttpHeaders({
      "x-auth-token": localStorage.getItem("xAuthToken")
    });
    return this.http.post<Book>(`${API_URL}/book/add`, book, { headers });
  }
}
