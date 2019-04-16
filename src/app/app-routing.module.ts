import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';
import { AuthOptionsComponent } from './auth-options/auth-options.component';
import { SmsVerificationComponent } from './sms-verification/sms-verification.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes =  [
  { path: '', component: LoginFormComponent},
  { path: 'signup', component: SignupComponentComponent},
  { path: 'authoptions', component: AuthOptionsComponent},
  { path: 'smsverification', component: SmsVerificationComponent},
  { path: 'confirmed', component: ConfirmationComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
