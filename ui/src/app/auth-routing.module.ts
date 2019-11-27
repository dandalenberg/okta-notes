import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';

import { AuthInterceptor } from './okta/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const config = {
  issuer: 'https://dev-628984.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oa1vvusz3jYHrlUo357',
}

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];


@NgModule({
  declarations: [LoginComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    OktaAuthModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: config },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
