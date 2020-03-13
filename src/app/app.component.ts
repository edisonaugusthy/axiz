import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader: boolean = false;
  constructor(router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }

      }
    });
  }
}
