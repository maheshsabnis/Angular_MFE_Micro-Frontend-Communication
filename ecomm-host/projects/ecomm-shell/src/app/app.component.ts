import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecomm-shell';
  filterValue:string = '';

  /* Send the Filter value to search the record using the custom event
  */

  filterNotification() {
    const event = new CustomEvent('filter_event', {
      detail: {
        name: this.filterValue,
      }
    });
    window.dispatchEvent(event);
  }


}
