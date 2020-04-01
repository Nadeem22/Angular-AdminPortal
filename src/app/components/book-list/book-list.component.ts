import { RemoveBookService } from "./../../services/remove-book.service";
import { BookListService } from "./../../services/book-list.service";
import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/book";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"]
})
export class BookListComponent implements OnInit {
  private seelctedBook: Book;
  private checked: boolean;
  private bookList: Book[];
  private allChecked: boolean;
  private removedBookList: Book[] = new Array();

  constructor(
    private bookListService: BookListService,
    private router: Router,
    private dialoge: MatDialog,
    private removeBookService: RemoveBookService
  ) {}
  onSelect(book: Book) {
    this.seelctedBook = book;
    this.router.navigate(["/viewBook", this.seelctedBook.id]);
  }
  openDialog(book: Book) {
    let dialogRef = this.dialoge.open(DialogeResultExampleDialoge);
    dialogRef.afterClosed().subscribe(
      response => {
        console.log("open Dialog");
        if (response == "yes") {
          this.removeBookService.sendBook(book.id).subscribe(
            response => {
              console.log("Removed Books");
              this.getBookList();
            },
            error => {
              console.log("Some Error at removing Books" + error);
            }
          );
        }
      },
      error => {
        console.log("error in open dialog" + error);
      }
    );
  }
  getBookList() {
    this.bookListService.getBook().subscribe(
      response => {
        console.log(response);
        this.bookList = response;
      },
      error => {
        console.log("some error to feth booklist" + error);
      }
    );
  }
  updateRemoveBookList(checked: boolean, book: Book) {
    console.log("In Update Remove Book");
    if (checked) {
      this.removedBookList.push(book);
    } else {
      this.removedBookList.splice(this.removedBookList.indexOf(book), 1);
    }
  }
  updateSelected(checked: boolean) {
    console.log("In Update Selected");
    if (checked) {
      this.allChecked = true;
      this.removedBookList = this.bookList.slice();
    } else {
      this.allChecked = false;
      this.removedBookList = [];
    }
  }
  removeSelectedBooks(book: Book) {
    let dialogRef = this.dialoge.open(DialogeResultExampleDialoge);
    dialogRef.afterClosed().subscribe(
      response => {
        console.log("open Dialog");
        if (response == "yes") {
          for (let book of this.removedBookList) {
            this.removeBookService.sendBook(book.id).subscribe(
              response => {
                console.log("Removed Books");
              },
              error => {
                console.log("Some Error at removing Books" + error);
              }
            );
          }
          location.reload();
        }
      },
      error => {
        console.log("error in open dialog" + error);
      }
    );
  }
  ngOnInit() {
    this.getBookList();
  }
}
@Component({
  selector: "dialoge-result-example-dialoge",
  templateUrl: "./dialoge-result-example-dialoge.html"
})
export class DialogeResultExampleDialoge {
  constructor(public dialogRef: MatDialogRef<DialogeResultExampleDialoge>) {}
}
