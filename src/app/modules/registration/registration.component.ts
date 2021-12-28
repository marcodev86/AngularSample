import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IRegistration } from 'src/app/core/iRegistration.interface';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { LOCALE_ID, Inject } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})

export class RegistrationComponent implements OnInit {

  displayedColumns: string[] = ['studente', 'corso', 'data', 'rimuovi'];
  dataSource : MatTableDataSource<IRegistration> = new MatTableDataSource;

  constructor(
    private router: Router, 
    private httpClient: HttpClient,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    this.studenteService.getRegistration().subscribe(Response => {
      this.dataSource = new MatTableDataSource<IRegistration>(Response);
      console.log(this.dataSource.data);
      this.studenteService.dataSourceRegistration = this.dataSource;
    }); 
  }

}
