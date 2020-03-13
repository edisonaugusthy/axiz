import { Injectable } from "@angular/core";
import { tap, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { NgStorageService } from 'ng7-storage';
import { LoaderService } from './loader.service';


@Injectable()
export class InterCeptor implements HttpInterceptor {
    constructor(private StorageService: NgStorageService,
        private loaderSvc: LoaderService, ) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.StorageService.getData('access_token');
        const updatedRequest = request.clone({
            setHeaders: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }

        });
        return next.handle(updatedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                this.loaderSvc.hideLoader();
                return throwError((error))
            })
        )
    }
}
