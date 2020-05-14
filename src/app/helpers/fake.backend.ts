import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../services/auth.service';

export const config = {
    apiUrl: 'http://localhost:4200'
};

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const { url, method, body } = request;

        let users: User[] = [
            { id: 1, username: 'User', password: 'password', email: 'test@email.com' }
        ];

        const storageUsers = localStorage.getItem('users');

        if (storageUsers) {
            users = JSON.parse(storageUsers);
        }

        return of(null).pipe(mergeMap(() => {

            if (url.endsWith('/users/authenticate') && method === 'POST') {
                const user = users.find(x => {
                    return(x.username === body.username || x.email === body.username) && x.password === body.password;
                });
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: `fake-jwt-token`
                });
            }

            if (url.endsWith('/users/register') && method === 'POST') {
                const reqBody = body.user;
                const reqUser = JSON.parse(reqBody);

                const isUserExist = users.find(x => x.username === reqBody.username || x.email === reqBody.email);
                if (isUserExist) return error('Username or email is already in use.');

                const user = {
                    id: Date.now(),
                    username: reqUser.username,
                    email: reqUser.email,
                    password: reqUser.password,
                    token: `fake-jwt-token`
                };

                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: `fake-jwt-token`
                });
            }

            return next.handle(request);
        }))

        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
