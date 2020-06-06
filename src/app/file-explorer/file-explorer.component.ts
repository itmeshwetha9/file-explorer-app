import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";

import { File } from "./model/file";
import { NewFolderDialogComponent } from "../new-folder-dialog/new-folder-dialog.component";

@Component({
  selector: "app-file-explorer",
  templateUrl: "./file-explorer.component.html",
  styleUrls: ["./file-explorer.component.scss"],
})
export class FileExplorerComponent implements OnInit {
  @Input() files: File[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  @Output() folderAdded = new EventEmitter<{
    name: string;
    isFolder: boolean;
  }>();
  @Output() navigatedDown = new EventEmitter<File>();
  @Output() navigatedUp = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent, {
      width: "30%",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.folderAdded.emit({
          name: res.name,
          isFolder: res.isFolder == "true" ? true : false,
        });
      }
    });
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  navigate(element: File) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }
}
