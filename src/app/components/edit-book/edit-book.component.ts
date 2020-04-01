import { Router, ActivatedRoute, Params } from "@angular/router";
import { GetBookService } from "./../../services/get-book.service";
import { UploadFileService } from "./../../services/upload-file.service";
import { EditBookService } from "./../../services/edit-book.service";
import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/book";
import { HttpEventType, HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-edit-book",
  templateUrl: "./edit-book.component.html",
  styleUrls: ["./edit-book.component.css"]
})
export class EditBookComponent implements OnInit {
  private bookId: number;
  private book: Book = new Book();
  private bookUpdated: boolean;
  selectedFiles: FileList;
  currentFileUpload: File;
  currentFile: File;
  progress: number;
  constructor(
    private editBookService: EditBookService,
    private uploadFileService: UploadFileService,
    private getBookService: GetBookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  onSubmit() {
    this.editBookService.sendBook(this.book).subscribe(
      response => {
        console.log("reponse for modify book  " + response);
        this.book = response;
        this.currentFile = this.selectedFiles.item(0);
        this.uploadFileService.upload(this.currentFile, this.book.id).subscribe(
          response => {
            if (response.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(
                (100 * response.loaded) / response.total
              );
            } else if (event instanceof HttpResponse) {
              console.log(
                "some error accures at the time of file uploading" + event
              );
              //this.message = event.body.message;
              //this.fileInfos = this.uploadFileService.getFiles();
            }
          },
          error => {
            console.log("Some error is accured during image update" + error);
          }
        );
        this.bookUpdated = true;
      },
      error => {
        console.log("error in modify book " + error);
      }
    );
  }
  ngOnInit() {
    console.log("in edit book component");
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params["id"]);
      console.log("ID IS=======>" + this.bookId);
    });
    this.getBookService.getBook(this.bookId).subscribe(
      response => {
        console.log("response of edit book :-" + response);
        this.book = response;
      },
      error => {
        console.log("some error accured in edit book service" + error);
      }
    );
  }
}
