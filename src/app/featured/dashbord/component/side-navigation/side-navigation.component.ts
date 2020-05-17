import { environment } from './../../../../../environments/environment';
import { SideMenuOptions } from './../../../../shared/constants/sidemenu-options';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DashbordService } from '../../services/dashbord.service';
import { NgStorageService } from 'ng7-storage';
import { UserType } from 'src/app/featured/authentication/models/user-type.enum';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {
  isSuperAdmin: boolean;
  imageBase = environment.imageBase;
  constructor(
    private router: Router,
    private StorageService: NgStorageService,
    private activatedRoute: ActivatedRoute,
    private dashboardSvc: DashbordService,
  ) {

  }
  sideMenuList: Array<any>;
  ngOnInit() {
    this.activate();
    this.dashboardSvc.userSwichStatus.subscribe(val => {
      if (val) {
        this.activate();
      }
    })
  }


  activate() {
    if (this.StorageService.getData('user_type') === UserType.SuperAdmin) {
      this.sideMenuList = SideMenuOptions.SUPER_ADMIN_MENU;
      this.isSuperAdmin = true;
    } else {
      this.isSuperAdmin = false;
      this.sideMenuList = SideMenuOptions.USER_MENU;
    }

    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url) {
          this.addCass(event.url);
        }
      }
    });
    this.addCass(this.router.url);
  }

  navigate(item) {
    this.router.navigate(['dashbord', item.path]);
  }

  showMenu(item) {
    this.navigate(item);
    return item.isOpen = !item.isOpen;
  }
  addCass(item) {

    for (let i = 0; i < this.sideMenuList.length; i++) {
      const element = this.sideMenuList[i];
      this.sideMenuList[i].class = '';
      this.sideMenuList[i].isOpen = false;
      if (element.sub_menu) {
        for (let j = 0; j < element.sub_menu.length; j++) {
          const innerItem = this.sideMenuList[i].sub_menu[j];
          innerItem.class = '';
          element.class = '';
          if (`/dashbord/${innerItem.path}` === item) {
            this.sideMenuList[i].isOpen = true;
            innerItem.class = 'selected';
            // element.class = 'nav-item dropdown menu-active';
          }
          element.sub_menu[j] = innerItem;
          this.sideMenuList[i] = element;
        }
      }
      else if (`/dashbord/${element.path}` === item) {
        element.class = 'selected';
        this.sideMenuList[i] = element;
      }
    }
  }

}
