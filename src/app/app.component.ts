import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/data.service';
import { RouterOutlet, Route, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  message: boolean;

  constructor(private data: DataService,
    private _router: Router) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this._router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

}
