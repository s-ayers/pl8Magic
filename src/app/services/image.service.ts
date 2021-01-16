import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from '@s-ayers/pl8image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private activeSource: BehaviorSubject<Image.Pl8Image> = new BehaviorSubject<Image.Pl8Image>(null);
  public active = this.activeSource.asObservable();
  constructor() { }

  setActive(image: Image.Pl8Image) {
    this.activeSource.next(image);
  }

  getActive() {

  }

}
