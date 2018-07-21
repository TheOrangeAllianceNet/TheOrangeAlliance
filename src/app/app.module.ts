import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

const ROUTES = [
  {
    path: 'sign-in',
    loadChildren: 'app/sign-in/sign-in.module#SignInModule'
  },
  {
    path: 'sign-up',
    loadChildren: 'app/sign-up/sign-up.module#SignUpModule'
  },
  {
    path: 'events',
    loadChildren: 'app/events/relic-recovery/relic-recovery.module#RelicRecoveryModule'
  },
  {
    path: 'events/relic-recovery',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events/relic-recovery/:eventID',
    loadChildren: 'app/events/relic-recovery/relic-recovery-event/relic-recovery-event.module#RelicRecoveryEventModule'
  },
  {
    path: 'teams',
    loadChildren: 'app/teams/teams.module#TeamsModule'
  },
  {
    path: '',
    component: HomeComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    ForgotPasswordComponent,
    EmailVerificationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
