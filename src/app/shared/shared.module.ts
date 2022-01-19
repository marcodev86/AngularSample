import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayjsPipe } from './pipe/dayjs.pipe';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DayjsPipe],
  imports: [CommonModule],
  exports: [DayjsPipe, TranslateModule],
})
export class SharedModule {}
