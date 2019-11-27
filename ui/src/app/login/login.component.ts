import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signIn: any;
  widget = new OktaSignIn({
    baseUrl: 'https://dev-628984.okta.com',
    authParams: {
      pkce: true
    }
  });

  constructor(oktaAuth: OktaAuthService, router: Router) {
    this.signIn = oktaAuth;

    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
          case '/note-list':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });

  }

  ngOnInit() {
    this.widget.renderEl(
      { el: '#okta-signin-container' },
      (res) => {
        if (res.status === 'SUCCESS') {
          this.signIn.loginRedirect('/', { sessionToken: res.session.token });
          //hide the widget
          this.widget.hide();
        }
      },
      (err) => {
        throw err;
      }

    );
  }
}
