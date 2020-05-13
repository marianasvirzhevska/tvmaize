import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageService } from './storage.service';

export const config = {
    apiUrl: 'http://localhost:4200'
};

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    token?: string;
    confirmPassword?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private http: HttpClient,
        private storage: StorageService,
    ) {
        this.userSubject = new BehaviorSubject<User>(this.storage.getItem('user'));
        this.user = this.userSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                if (user && user.token) {
                    this.storage.setItem('user', user);
                    this.userSubject.next(user);
                }

                return user;
            }));
    }

    register(user: User) {
        const newUser = JSON.stringify(user);
        return this.http.post<any>(`${config.apiUrl}/users/register`, { user: newUser })
        .pipe(map(user => {

            if (user && user.token) {
                this.storage.setItem('user', user);
                this.userSubject.next(user);
            }

            return user;
        }));
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
    }
}
