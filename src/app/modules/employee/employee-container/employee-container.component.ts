import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-employee-container',
  templateUrl: './employee-container.component.html',
  styleUrls: ['./employee-container.component.css'],
})
export class EmployeePageComponent {
  selectedTab: 'table' | 'new' | 'assign' = 'table';
  currentPath = this.location.path();

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService
  ) {}

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

  isAdmin() {
    return this.userService.isAdmin();
  }
}
