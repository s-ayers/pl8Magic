import { Component, OnInit, Input } from '@angular/core';
// import { Image } from '@s-ayers/pl8image'';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../services/image.service';
import { Image } from '@s-ayers/pl8image';
import { GraphicFactory } from '@s-ayers/pl8image';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  data: any;
  @Input() palettes: object = {};
  processing = false;

  imageData = null;
  constructor(
    private sanitizer: DomSanitizer,
    private imageService: ImageService
  ) {}

  ngOnInit() {

    this.imageService.active.subscribe((image) => {
      if (image !== null) {
        this.data = image;
        this.processing = true;
        setTimeout(() => {
          this.preview();
        }, 100);
        // this.preview();
      }
    });
  }

  async preview() {
    if (
      this.data !== null &&
      this.data.palette !== null &&
      this.palettes.hasOwnProperty(this.data.palette)
    ) {
      const palette = this.palettes[this.data.palette].palette;
      const binImage = GraphicFactory.Pl8(this.data, palette);
      const strImage = await binImage.toPNG();

      const sanData = this.sanitizer.bypassSecurityTrustStyle(
        strImage.toString('base64')
      );

      this.imageData =
        'data:image/png;base64,' +
        sanData['changingThisBreaksApplicationSecurity'];
    }

    this.processing = false;
  }
}
