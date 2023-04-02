import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-equipment-page',
  templateUrl: './equipment-page.component.html',
  styleUrls: ['./equipment-page.component.css'],
})
export class EquipmentPageComponent implements OnInit {
  selectedTab?: 'table' | 'new' | 'brand';
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
        this.selectedTab = <'table' | 'new' | 'brand'>(
          this.currentPath.split('/')[2]
        );
      }
    });
    this.selectedTab = <'table' | 'new' | 'brand'>(
      this.currentPath.split('/')[2]
    );
  }

  isAdmin() {
    return this.userService.isAdmin();
  }
}
