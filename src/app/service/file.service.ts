import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { v4 } from 'uuid'
import { File } from '../file-explorer/model/file'

export interface IFileService {
  add(fileElement: File)
  queryInFolder(folderId: string): Observable<File[]>
  get(id: string): File
}

@Injectable({
  providedIn: 'root'
})
export class FileService implements IFileService{

  private map = new Map<string, File>()

  constructor() {}

  add(fileElement: File) {
    fileElement.id = v4()
    this.map.set(fileElement.id, this.clone(fileElement))
    return fileElement
  }

  private querySubject: BehaviorSubject<File[]>
  queryInFolder(folderId: string) {
    const result: File[] = []
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element))
      }
    })
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result)
    } else {
      this.querySubject.next(result)
    }
    return this.querySubject.asObservable()
  }

  get(id: string) {
    return this.map.get(id)
  }

  clone(element: File) {
    return JSON.parse(JSON.stringify(element))
  }

}
