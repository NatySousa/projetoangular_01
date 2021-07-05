import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.url.includes("api/Auth") || !request.url.includes("api/Account")) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
        }

        return next.handle(request);
    }
}
