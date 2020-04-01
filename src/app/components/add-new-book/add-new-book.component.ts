import { UploadFileService } from "./../../services/upload-file.service";
import { UploadImageService } from "./../../services/upload-image.service";
import { AddBookService } from "./../../services/add-book.service";
import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/book";
import { Observable } from "rxjs";
import { HttpEventType, HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-add-new-book",
  templateUrl: "./add-new-book.component.html",
  styleUrls: ["./add-new-book.component.css"]
})
export class AddNewBookComponent implements OnInit {
  private newBook: Book = new Book();
  private bookAdded: boolean;
  selectedFiles: FileList;
  currentFileUpload: File;
  //new Code Added
  currentFile: File;
  progress = 0;
  message = "";
  fileInfos: Observable<any>;
  //till heere
  constructor(
    private addBookService: AddBookService,
    private uploadImageService: UploadImageService,
    private uploadFileService: UploadFileService
  ) {}
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  ngOnInit() {
    this.bookAdded = false;
    this.newBook.active = true;
    this.newBook.category = "Management";
    this.newBook.language = "English";
    this.newBook.format = "PaperBack";
  }
  onSubmit() {
    this.addBookService.sendBook(this.newBook).subscribe(
      response => {
        console.log("Added Sucessfully" + response);
        this.newBook = response;
        console.log("added Book Id is----------------------" + this.newBook.id);
        //new code ----
        console.log("current id is ===============" + this.newBook.id);
        this.currentFile = this.selectedFiles.item(0);
        this.uploadFileService
          .upload(this.currentFile, this.newBook.id)
          .subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                console.log(
                  "some error accures at the time of file uploading" + event
                );
                //this.message = event.body.message;
                //this.fileInfos = this.uploadFileService.getFiles();
              }
            },
            err => {
              console.log("error in ile uploading");
              // this.progress = 0;
              //this.message = "Could not upload the file!";
              this.currentFile = undefined;
            }
          );
        this.selectedFiles = undefined;
        //end here

        // this.uploadImageService.upload(
        //   JSON.parse(JSON.parse(JSON.stringify(response))._body).id
        // );
        this.bookAdded = true;
        this.newBook = new Book();
        this.newBook.active = true;
        this.newBook.category = "Management";
        this.newBook.language = "English";
        this.newBook.format = "PaperBack";
      },
      error => {
        console.log("Some Error in Add Book" + error);
      }
    );
  }
}
