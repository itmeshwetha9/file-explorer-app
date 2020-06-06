import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatRadioModule
} from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FileExplorerComponent } from "./file-explorer/file-explorer.component";
import { NewFolderDialogComponent } from "./new-folder-dialog/new-folder-dialog.component";
import { FileService } from './service/file.service';

@NgModule({
  declarations: [AppComponent, FileExplorerComponent, NewFolderDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule
  ],
  entryComponents:[NewFolderDialogComponent],
  providers: [FileService],
  bootstrap: [AppComponent],
})
export class AppModule {}
