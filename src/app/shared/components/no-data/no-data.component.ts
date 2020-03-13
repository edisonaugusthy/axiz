import { environment } from './../../../../environments/environment';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent implements OnInit {
  imageBase = environment.imageBase;
  constructor() { }

  ngOnInit(): void {
  }

}
