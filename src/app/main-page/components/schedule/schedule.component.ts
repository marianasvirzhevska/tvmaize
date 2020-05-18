import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { DateService } from '../../../services/date.service';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  shows = [];
  loading =  true;
  today: string;

  constructor(
    private apiService: ApiService,
    private dateService: DateService,
    private storage: StorageService,
  ) { }

  ngOnInit(): void {
    const date = new Date();
    const today = `${this.dateService.getMonth(date)} ${date.getDate()}`;

    this.today = today;
    
    const data = this.storage.getItem('data');
    console.log('data', data)
    
    if (data) {
      this.loading = false;
      this.shows = data;
    } else {
      console.log('false')
      this.apiService.fetchData()
        .subscribe((data) => {
          this.shows = data;
          this.loading = false;
        })
    }
  }  
}
