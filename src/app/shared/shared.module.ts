import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayjsPipe } from './pipe/dayjs.pipe';

@NgModule({
  declarations: [DayjsPipe],
  imports: [CommonModule],
  exports: [DayjsPipe],
})
export class SharedModule {}
