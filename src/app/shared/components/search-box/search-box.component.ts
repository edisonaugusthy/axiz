import { DashbordService } from './../../../featured/dashbord/services/dashbord.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { AppConstants } from '../../constants/app-constants';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @ViewChild('SearchInput', { static: true }) SearchInput: ElementRef;
  constructor(
    private dashboardSvc: DashbordService,
  ) { }

  ngOnInit() {
    this.search();
  }


  search() {
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(AppConstants.SEARCH_TIMEOUT),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.dashboardSvc.setSearchString(text);
    });
  }

}
