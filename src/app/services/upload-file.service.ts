import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UploadFileService {
  private baseUrl = "http://localhost:8181";
  constructor(private http: HttpClient) {}
  upload(file: File, id: number): Observable<HttpEvent<any>> {
    console.log("in book image upload");
    const formData: FormData = new FormData();
    console.log("in file upload Service");
    formData.append("file", file);
    const req = new HttpRequest(
      "POST",
      `${this.baseUrl}/book/add/image/${id}`,
      formData,
      {
        reportProgress: true,
        responseType: "json"
      }
    );
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  modify(file: File, id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    console.log("in file upload Service");
    formData.append("file", file);
    const req = new HttpRequest(
      "POST",
      `${this.baseUrl}/book/add/image/${id}`,
      formData,
      {
        reportProgress: true,
        responseType: "json"
      }
    );
    return this.http.request(req);
  }
}
