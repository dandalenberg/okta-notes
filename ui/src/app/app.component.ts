import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OktaAuthService } from '@okta/okta-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Notes Application';

  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, private location: Location) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  logout() {
    this.oktaAuth.logout('/');
  }

  goBack() {
    this.location.back();
  }

}
