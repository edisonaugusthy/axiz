import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../../services/dashbord.service';
import { LoaderService } from '../../../../shared/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dashBordService: DashbordService, private loaderSVC: LoaderService) { }
  events: string[] = [];
  opened: true;
  ngOnInit() {
    this.loaderSVC.hideLoader();
  }

}
