import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from './shared/services/alert/alert.service';
import { AlertType } from './shared/components/alert/alert.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  alertType: AlertType = 'default';
  alertContent: string = '';
  isAlert: boolean = false;
  private alertTypeSubscription?: Subscription;
  private alertContentSubscription?: Subscription;
  private alertDurationSubscription?: Subscription;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertTypeSubscription = this.alertService.type?.subscribe((value) => {
      this.alertType = <AlertType>value;
    });

    this.alertContentSubscription = this.alertService.content?.subscribe(
      (value) => {
        this.alertContent = <AlertType>value;
      }
    );

    this.alertDurationSubscription = this.alertService.duration.subscribe(
      (value) => {
        this.isAlert = true;
        setTimeout(() => {
          this.isAlert = false;
        }, value);
      }
    );
  }

  ngOnDestroy(): void {
    this.alertTypeSubscription?.unsubscribe();
    this.alertContentSubscription?.unsubscribe();
    this.alertDurationSubscription?.unsubscribe();
  }
}
