import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StudenteServiceService } from 'src/app/services/studente-service.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InsegnamentoFormComponent } from './modules/insegnamento-form/insegnamento-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatPaginatorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatInputModule,
    MatIconModule,
  ],
  providers: [StudenteServiceService],
  bootstrap: [AppComponent],
  entryComponents: [InsegnamentoFormComponent],
})
export class AppModule {}
