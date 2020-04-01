import { GetBookService } from "./../../services/get-book.service";
import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/models/book";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-view-book",
  templateUrl: "./view-book.component.html",
  styleUrls: ["./view-book.component.css"]
})
export class ViewBookComponent implements OnInit {
  private book: Book;
  private bookId: number;
  constructor(
    private getBookService: GetBookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.forEach((parms: Params) => {
      this.bookId = Number.parseInt(parms["id"]);
    });
    this.getBookService.getBook(this.bookId).subscribe(
      response => {
        console.log("getBook REsponse :-" + response);
        this.book = response;
      },
      error => {
        console.log("Some Error Acurred during get Book :-" + error);
      }
    );
  }
  onSelect(book) {
    console.log("edit book");
    this.router.navigate(["/editBook", this.book.id]);
    //.then(s => location.reload());
  }
}
