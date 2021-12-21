import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { View1Component } from './view/view1/view1.component';
import { ContentView2Component } from './view/view2/content-view2/content-view2.component';
import { View2Component } from './view/view2/view2.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { StudenteServiceService} from 'src/app/services/studente-service.service';


@NgModule({
  declarations: [
    AppComponent,
    View1Component,
    View2Component,
    ContentView2Component,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [StudenteServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
