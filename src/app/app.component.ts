import { Component, OnInit, HostListener } from '@angular/core';
import { Image, Palette } from '@s-ayers/pl8image';
import * as CryptoJS from 'crypto-js';
import data from './palette.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pl8Magic';

  sprites: object = {};
  palettes: object = {};

  preview: Image.Pl8Image = null;

  @HostListener('window:drop', ['$event'])

  onDrop(event) {
    event.preventDefault();

    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === 'file') {
          const file = event.dataTransfer.items[i].getAsFile();

          if (this.isPalette(file)) {
            this.addPalette(file);
          } else if (this.isSprite(file.name)) {
            this.addSprite(file);
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        // console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].name);
        // console.log('isSprint: ' + this.isSprite(event.dataTransfer.files[i].name));
        // console.log('isPalette: ' + this.isPalette(event.dataTransfer.files[i]));
      }
    }
  }
  @HostListener('window:dragover', ['$event'])
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  isSprite(filename: string): boolean {
    const split = filename.split('.');
    return (split.length === 2 && split[1].toLocaleLowerCase() === 'pl8');
  }

  isPalette(file: any): boolean {
    const split = file.name.split('.');
    const is = (split.length === 2 && split[1] === '256');

    return is;
  }

  addSprite(sprite: File) {

    const reader = new FileReader();
    reader.onload = (e) => {
      const message = this.arrayBufferToWordArray(reader.result);
      const hash = CryptoJS.SHA256(message).toString();

      if (!this.sprites.hasOwnProperty(hash)) {
        const pl8 = Image.buffer(Buffer.from(reader.result));
        pl8['name'] = sprite.name.split('.')[0];
        pl8['hash'] = hash;
        pl8['palette'] = null;
        pl8['default_palette'] = null;

        if (data.hasOwnProperty(hash)) {
          pl8['default_palette'] = data[hash];
          pl8['palette'] = data[hash];
        }

        this.sprites[hash] = pl8;
      }

    };
    reader.readAsArrayBuffer(sprite);
  }


  exportPalette() {
    const current = {};
    Object.keys(this.sprites).forEach(hash => {
      if (this.sprites[hash]['palette'] !== null) {
        current[hash] = this.sprites[hash]['palette'];
      }

    });

    const palette = JSON.stringify(Object.assign({}, data, current), null, 4);

    const link = document.createElement('a');
    link.download = 'palette.json';
    link.href = 'data:text/json;charset=UTF-8,' + encodeURIComponent(palette);
    link.click();
  }

  addPalette(palette: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const message = this.arrayBufferToWordArray(reader.result);
      const hash = CryptoJS.SHA256(message).toString();

      if (!this.palettes.hasOwnProperty(hash)) {

        const pal = {
          name: palette.name.split('.')[0],
          hash: hash,
          palette: Palette.buffer(Buffer.from(reader.result))
        };

        this.palettes[hash] = pal;
      }

    };
    reader.readAsArrayBuffer(palette);

  }
  setPreview(event) {
    // console.log(event);
    this.preview = event;
  }
  private arrayBufferToWordArray(ab) {
    const i8a = new Uint8Array(ab);
    const a = [];
    for (let i = 0; i < i8a.length; i += 4) {
      a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
  }
}
