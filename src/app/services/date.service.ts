import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DateService {
    constructor() {}

    formatDate(date = Date()): string {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    getMonth(date: Date): string {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

        return monthNames[date.getMonth()];
    }

    getYear(date: string): string {
        return date.split('-')[0];
    }
}
