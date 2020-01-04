import { Component,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent  {

  @Output() exportPalette: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  emitExportPalette() {
    this.exportPalette.emit(true);
  }


}
