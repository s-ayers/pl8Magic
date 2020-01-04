import { Component, OnInit, Input } from '@angular/core';
// import { Image } from '@s-ayers/pl8image"';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() data: any = 'undefined';
  @Input() palettes: object = {};

  imageData = null;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  async preview() {

    if ( this.data !== null && this.data.palette !== null && this.palettes.hasOwnProperty(this.data.palette)) {
      const palette = this.palettes[this.data.palette].palette;
      const binImage = await this.data.Orthogonal(palette).toPNG();
      const sanData = this.sanitizer.bypassSecurityTrustStyle( binImage.toString('base64') );

      this.imageData = 'data:image/png;base64,' + sanData['changingThisBreaksApplicationSecurity'];

    }
  }
}
