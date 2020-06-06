import { Component, OnDestroy, OnInit, HostListener } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { File } from "./file-explorer/model/file";
import { FileService } from "./service/file.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "file-explorer-app";
  files: Observable<File[]>;
  currentRoot: File;
  currentPath: string;
  canNavigateUp = false;

  constructor(private fileService: FileService) {}

  ngOnInit() {
    if (sessionStorage.getItem("files")) {
      const result: File[] = JSON.parse(sessionStorage.getItem("files"));
      let querySubject = new BehaviorSubject(result);
      this.files=querySubject.asObservable()
    }
  }

  addFolder(folder: { name: string; isFolder: boolean }) {
    this.fileService.add({
      isFolder: folder.isFolder,
      name: folder.name,
      parent: this.currentRoot ? this.currentRoot.id : "root",
    });
    this.updateFileQuery();
  }

  updateFileQuery() {
    this.files = this.fileService.queryInFolder(
      this.currentRoot ? this.currentRoot.id : "root"
    );
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === "root") {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileQuery();
    } else {
      this.currentRoot = this.fileService.get(this.currentRoot.parent);
      this.updateFileQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  navigateToFolder(element: File) {
    this.currentRoot = element;
    this.updateFileQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : "";
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : "";
    let split = p.split("/");
    split.splice(split.length - 2, 1);
    p = split.join("/");
    return p;
  }

  ngOnDestroy() {}

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    this.files.subscribe((files) => {
      sessionStorage.setItem("files", JSON.stringify(files));
    });
    event.returnValue = false;
  }
}
