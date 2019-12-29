import { Component, OnInit } from '@angular/core';
import { AppToastService } from '../toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})
export class ToastsComponent {

  constructor(public toastService: AppToastService) { }

}
