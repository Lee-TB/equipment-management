import { Component, Input } from '@angular/core';
import { Dismiss } from 'flowbite';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'default';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() type: AlertType = 'default';
  @Input() content: string = '';

  onClose(event: Event, targetElement: HTMLElement) {
    // optional trigger element
    const triggerElement: HTMLElement = <HTMLElement>event.target;

    // options object
    const options = {
      transition: 'transition-opacity',
      duration: 5000,
      timing: 'ease-out',

      // callback functions
      onHide: (context: any, targetEl: any) => {},
    };

    const dismiss = new Dismiss(targetElement, triggerElement, options);

    // hide the target element
    dismiss.hide();
  }
}
