import { ViewBookComponent } from "./components/view-book/view-book.component";
import { BookListComponent } from "./components/book-list/book-list.component";
import { AddNewBookComponent } from "./components/add-new-book/add-new-book.component";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditBookComponent } from "./components/edit-book/edit-book.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "addNewBook", component: AddNewBookComponent },
  { path: "bookList", component: BookListComponent },
  { path: "viewBook/:id", component: ViewBookComponent },
  { path: "editBook/:id", component: EditBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
