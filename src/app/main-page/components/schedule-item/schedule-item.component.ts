import { Component, OnInit, Input } from '@angular/core';

import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {
  premiered: string;
  country: string;

  constructor(
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
    this.premiered = this.dateService.getYear(this.show.show.premiered);
    this.country = this.getCountry(this.show);
  }

  @Input() show;

  private getCountry(data): string {
    const { show } = data;
    
    if (show.webChannel) {
      return show.webChannel.country.name;
    }

    if (show.network) {
      return show.network.country.name;
    }
  }
}
