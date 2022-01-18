import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { View1Component } from './view/view1/view1.component';
import { ContentView2Component } from './view/view2/content-view2/content-view2.component';
import { View2Component } from './view/view2/view2.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StudenteServiceService } from 'src/app/services/studente-service.service';
import { HttpClientModule } from '@angular/common/http';
import { InsegnamentoFormComponent } from './modules/insegnamento-form/insegnamento-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    View1Component,
    View2Component,
    ContentView2Component,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  providers: [StudenteServiceService],
  bootstrap: [AppComponent],
  entryComponents: [InsegnamentoFormComponent],
})
export class AppModule {}
