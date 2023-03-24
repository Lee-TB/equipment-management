import { Injectable } from '@angular/core';
import { AlertType } from '../../components/alert/alert.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  type = new BehaviorSubject('default');
  content = new BehaviorSubject('');
  duration = new BehaviorSubject(1000);

  setType(type: AlertType) {
    this.type.next(type);
  }

  setContent(content: string) {
    this.content.next(content);
  }

  setDuration(duration: number) {
    this.duration.next(duration);
  }
}
