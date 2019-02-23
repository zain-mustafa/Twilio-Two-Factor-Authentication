import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';

const routes: Routes =  [
  { path: '', component: LoginFormComponent},
  { path: 'signup', component: SignupComponentComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
