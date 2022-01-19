import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import * as dayjsit from 'dayjs/locale/it';
import { TranslateService } from '@ngx-translate/core';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'example';

  constructor(public translate: TranslateService) {
    this.initDayJs();
    dayjs.extend(localizedFormat);

    translate.addLangs(['it', 'en']);
    translate.setDefaultLang('it');
  }

  private initDayJs() {
    dayjs.locale(dayjsit);
  }
}
