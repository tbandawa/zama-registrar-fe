import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorResponse } from 'src/api/models';

@Injectable({ providedIn: 'root' })
export class LoadingService {

    isLoading: BehaviorSubject<boolean>
    errorResponse: BehaviorSubject<ErrorResponse | null>

    constructor() {
        this.isLoading = new BehaviorSubject(false)
        this.errorResponse = new BehaviorSubject(null)
    }

    show() {
        this.isLoading.next(true);
    }

    hide() {
        this.isLoading.next(false);
    }

    setError(error: ErrorResponse) {
        this.errorResponse.next(error)
    }
}