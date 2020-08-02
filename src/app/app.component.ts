import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { NgStorageService } from 'ng7-storage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeader: boolean = false;
  constructor(private router: Router, private StorageService: NgStorageService) {
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

  ngOnInit() {
    if (environment.production) {
      if (this.StorageService.getData('is-loggedIn')) {
        this.StorageService.removeAll();
        this.router.navigateByUrl('/login');
      }
    }

  }
}
