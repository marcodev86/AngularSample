import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import * as dayjsit from 'dayjs/locale/it';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'example';

  constructor() {
    this.initDayJs();
  }

  private initDayJs() {
    dayjs.locale(dayjsit);
  }
}
