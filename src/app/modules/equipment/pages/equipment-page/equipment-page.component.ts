import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-equipment-page',
  templateUrl: './equipment-page.component.html',
  styleUrls: ['./equipment-page.component.css'],
})
export class EquipmentPageComponent implements OnInit {
  selectedTab: 'table' | 'new' = 'table';
  currentPath = this.location.path();

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
        this.selectedTab = <'table' | 'new'>this.currentPath.split('/')[2];
      }
    });
    this.selectedTab = <'table' | 'new'>this.currentPath.split('/')[2];
  }

  ngOnDestroy() {}
}
