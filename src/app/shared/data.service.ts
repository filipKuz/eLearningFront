import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject(this.auth.isLoggedIn());
  private usernameMessage = new BehaviorSubject(this.auth.getUser());
  currentMessage = this.messageSource.asObservable();
  username = this.usernameMessage.asObservable();

  constructor(private auth: AuthorizationService) { }

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  changeUsername(username: string) {
    this.usernameMessage.next(username);
  }
}
