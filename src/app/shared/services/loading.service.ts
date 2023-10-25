import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<Boolean>;
  public loadingPage: Observable<Boolean>;
  public get loadingData(): Boolean {
    return this.loadingSubject.value;
  }
  
  constructor() {
    this.loadingSubject = new BehaviorSubject<Boolean>(true);
    this.loadingPage = this.loadingSubject.asObservable();
  }
  
  ChangeStatusLoading(state: Boolean) {
    this.loadingSubject.next(state);
    this.loadingPage = this.loadingSubject.asObservable();
  }
}
