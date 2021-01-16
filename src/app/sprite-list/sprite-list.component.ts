import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Image } from '@s-ayers/pl8image';
import { isNumber } from 'util';
import { ImageService } from '../services/image.service';

declare const window;

@Component({
  selector: 'app-sprite-list',
  templateUrl: './sprite-list.component.html',
  styleUrls: ['./sprite-list.component.css']
})
export class SpriteListComponent {

  @Input() images: any;
  @Input() palettes: any;
  @Output() newPreview = new EventEmitter();
  keyword: string = '';
  missingPalette: boolean = false;

  constructor(private imageService: ImageService) {

  }

  sprites() {
    const mySprites = [];

    for (let [key, value] of Object.entries(this.images)) {
      let add = true;
      if (value['palette'] === null && value['default_palette'] !== null) {
        value['palette'] = value['default_palette'];
      }
      // console.log(value['palette']);
      if (this.missingPalette && value['palette'] !== null) {
        add = false;
      }
      if (this.keyword.length > 0) {

        if (value['name'].toLowerCase().indexOf(this.keyword.toLowerCase()) === -1) {
          add = false;
        }

      }
      if (add) {
        mySprites.push(value);
      }


    }

    return mySprites.sort((first, second) => {
      return first.name.localeCompare(second.name);
    });
  }

  getPalettes() {
    const myPalettes = [];
    for (const [key, value] of Object.entries(this.palettes)) {
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

  changePreview(sprite: Image.Pl8Image) {
    console.log('Change Preview');
    // this.newPreview.emit(sprite);
    window['sprite'] = sprite;
    this.imageService.setActive(sprite);
  }


}
