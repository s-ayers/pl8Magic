import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Image} from '@s-ayers/pl8image';
import { isNumber } from 'util';


@Component({
  selector: 'app-sprite-list',
  templateUrl: './sprite-list.component.html',
  styleUrls: ['./sprite-list.component.css']
})
export class SpriteListComponent {

  @Input() images: any;
  @Input() palettes: any;
  @Output() newPreview = new EventEmitter();


  sprites() {
    let mySprites = [];
    for (let [key, value] of Object.entries(this.images)) {

      if (value['palette'] === null && value['default_palette'] !== null) {
        value['palette'] = value['default_palette'];
      }

      mySprites.push(value);
    }

    return mySprites.sort((first, second) => {
      return first.name.localeCompare(second.name);
    });
  }

  getPalettes() {
    let myPalettes = [];
    for (let [key, value] of Object.entries(this.palettes)) {
      myPalettes.push(value);
    }

    return myPalettes.sort((first, second) => {
      return first.name.localeCompare(second.name);
    });
  }

  typeString(type: number) {
   if (isNumber(type)) {
      return Image.TYPE[type];
   }
  }

  changePreview(sprite:Image.Pl8Image) {

    this.newPreview.emit(sprite);
  }

}
