import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<Boolean>;
  public loadingPage: Observable<Boolean>;
  public get loadingData(): Boolean {
    return this.loadingSubject.value;
  }
  private backgroundSubject: BehaviorSubject<string>;
  public backgroundPage: Observable<string>;
  public get backgroundData(): string {
    return this.backgroundSubject.value;
  }

  constructor() {
    this.loadingSubject = new BehaviorSubject<Boolean>(true);
    this.loadingPage = this.loadingSubject.asObservable();

    this.backgroundSubject = new BehaviorSubject<string>('white');
    this.backgroundPage = this.backgroundSubject.asObservable();
  }

  ChangeStatusLoading(state: Boolean) {
    this.loadingSubject.next(state);
    this.loadingPage = this.loadingSubject.asObservable();
  }

  ChangeStatusBackground(state: string) {
    this.backgroundSubject.next(state);
    this.backgroundPage = this.backgroundSubject.asObservable();
  }
}
