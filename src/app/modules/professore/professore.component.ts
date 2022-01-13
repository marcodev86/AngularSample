import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfessore, Professore } from 'src/app/core/iProfessore.interface';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ProfessoreFormComponent} from "../professore-form/professore-form.component";
import {InsegnamentoFormComponent} from "../insegnamento-form/insegnamento-form.component";

@Component({
  selector: 'app-professore',
  templateUrl: './professore.component.html',
  styleUrls: ['./professore.component.sass']
})

export class ProfessoreComponent implements OnInit, OnDestroy {

  myDate = new Date();
  updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  displayedColumns: string[] = ['id', 'nome', 'cognome', 'data', 'comune', 'codiceFiscale', 'telefono', 'cap', 'indirizzo', 'civico', 'corso', 'modifica', 'rimuovi'];
  dataSource : MatTableDataSource<IProfessore> = new MatTableDataSource;

  public selectedRowIndex = -1;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.studenteService.getProfessore().subscribe(Response => {
      this.dataSource = new MatTableDataSource<IProfessore>(Response);
      this.studenteService.dataSourceProfessore = this.dataSource;
    });
  }

  ngOnDestroy(): void {
    this.studenteService.dataSourceProfessore = new MatTableDataSource;
  }

  delete(id: number) : Observable<unknown> {
    return this.httpClient.delete(`http://localhost:8092/esercitazionePlansoft/professor/deleteById/${id}`);
  }

  deleteProfessore(id: number) {
    this.delete(id).subscribe(Response => {
      const data = this.dataSource.data;
      const index = data.findIndex( x => x.id === id);
      data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  startModify(element : any) {
    let found = false;
    this.studenteService.professoreCorrente = element as Professore;

    const dialogRef = this.dialog.open(ProfessoreFormComponent, {
      height: '700px',
      width: '1000px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe( () => {
      this.studenteService.getProfessore().subscribe(Response => {
        setTimeout( () => {
          const temp = this.dataSource;
          this.dataSource = new MatTableDataSource<IProfessore>(Response);
          this.studenteService.dataSourceProfessore = this.dataSource;
          for (let i of this.dataSource.data) {
            for (let j of temp.data) {
              if (this.areEquals(i, j)) {
                found = true;
                break;
              } else {
                found = false;
              }
            }
            if (!found) {
              this.selectedRowIndex = i.id;
            }
          }
        }, 300);
        setTimeout( () => this.selectedRowIndex = -1, 5000);
      });
    });
  }

  addCourse(element : any) {
    this.studenteService.professoreCorrente = element as Professore;
    //this.router.navigate(['insegnamento-form']);
    console.log('ciao');
    const dialogRef = this.dialog.open(InsegnamentoFormComponent, {
      height: '250px',
      width: '1000px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe();
  }

  addProfessor() {
    let found = false;

    const dialogRef = this.dialog.open(ProfessoreFormComponent, {
      height: '700px',
      width: '1000px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe( () => {
      this.studenteService.getProfessore().subscribe(Response => {
        setTimeout( () => {
          const temp = this.dataSource;
          this.dataSource = new MatTableDataSource<IProfessore>(Response);
          this.studenteService.dataSourceProfessore = this.dataSource;
          for (let i of this.dataSource.data) {
            for (let j of temp.data) {
              if (i.id == j.id) {
                found = true;
                break;
              } else {
                found = false;
              }
            }
            if (!found) {
              this.selectedRowIndex = i.id;
            }
          }
        }, 300);
        setTimeout( () => this.selectedRowIndex = -1, 5000);
      });
    });
  }

  filter(changes: any) : void{
    if(changes) {
      console.log(JSON.stringify(changes.target.value));
      this.dataSource.filter = changes.target.value;
      this.dataSource.filter.trim().toLowerCase();
    }
  }

  areEquals(obj1:Professore, obj2:Professore) : boolean {
    if (obj1.id === obj2.id &&
      obj1.name === obj2.name &&
      obj1.surname === obj2.surname &&
      obj1.birthdayDate === obj2.birthdayDate &&
      obj1.city === obj2.city &&
      obj1.fiscalCode === obj2.fiscalCode &&
      obj1.number === obj2.number &&
      obj1.cap === obj2.cap &&
      obj1.address === obj2.address &&
      obj1.houseNumber === obj2.houseNumber
    ) {
      return true;
    } else {
      return false;
    }
  }

}
