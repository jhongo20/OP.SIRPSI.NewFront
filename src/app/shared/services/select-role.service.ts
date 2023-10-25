import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectRoleService {
  private roleSelectSubject: BehaviorSubject<Boolean>;
  public roleSelectPage: Observable<Boolean>;
  public get roleSelectData(): Boolean {
    return this.roleSelectSubject.value;
  }

  constructor() {
    var role = sessionStorage['roleSelect'];
    this.roleSelectSubject = new BehaviorSubject<Boolean>(
      localStorage['roleSelect'] == 'true'
    );
    this.roleSelectPage = this.roleSelectSubject.asObservable();
  }

  SelectRoleUser(state: Boolean = true) {
    localStorage.setItem('roleSelect', `${state}`);
    this.roleSelectSubject.next(state);
    this.roleSelectPage = this.roleSelectSubject.asObservable();
  }
}
