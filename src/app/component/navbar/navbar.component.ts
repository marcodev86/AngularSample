import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})


export class NavbarComponent implements OnInit {
 /*  constructor() { }

  ngOnInit(): void {
  } */
  constructor( private router: Router) {

  }

  ngOnInit(): void {
  }
  
    links = ['/studente', 'corso', 'docenti'];
    activeLink = this.links[0];
    background: ThemePalette = undefined;
  
    public clickedTab(event: Event) : void{
      this.router.navigate([`/student`]);
  
    }
  

}
