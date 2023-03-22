import { Component, Input } from '@angular/core';
import { Dismiss } from 'flowbite';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' | 'default' =
    'default';
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
      onHide: (context: any, targetEl: any) => {
        console.log('element has been dismissed');
        console.log(targetEl);
      },
    };

    const dismiss = new Dismiss(targetElement, triggerElement, options);

    // hide the target element
    dismiss.hide();
  }
}
