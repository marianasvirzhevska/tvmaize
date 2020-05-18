import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageService } from './storage.service';
import { DateService } from './date.service';

export interface Todo {
    id: number,
    title: string,
    completed: boolean, 
    userId: number,
    date?: any,
    description?: string,
};


@Injectable({providedIn: 'root'})
export class ApiService {

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private dateService: DateService,
        
    ) {}

    fetchData(): Observable<Todo[]> {
        const date = this.dateService.formatDate();

        const url = `http://api.tvmaze.com/schedule?country=US&date=${date}`

        return this.http.get<Todo[]>(url).pipe(
            map(data => data),
        );
    }

}
