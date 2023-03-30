import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css'],
})
export class EmployeePageComponent {
  selectedTab: 'table' | 'new' | 'assign' = 'table';
  currentPath = this.location.path();

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
        this.selectedTab = <'table' | 'new' | 'assign'>(
          this.currentPath.split('/')[2]
        );
      }
    });
    this.selectedTab = <'table' | 'new' | 'assign'>(
      this.currentPath.split('/')[2]
    );
  }

  ngOnDestroy() {}
}
