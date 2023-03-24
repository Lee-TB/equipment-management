import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user/user.service';

type TabType = 'dashboard' | 'equipments' | 'users';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean = this.userService.isLoggedIn();
  selectedTab?: TabType;
  currentPath = '';
  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
        this.selectedTab = <TabType>this.currentPath.split('/')[1];
      }
    });
  }
}
