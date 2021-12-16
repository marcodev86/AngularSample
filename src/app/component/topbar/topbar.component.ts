import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

  public routeView1 = '/view1';
  public numberProperty: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }


}
