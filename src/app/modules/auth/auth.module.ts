import { NgModule } from '@angular/core';
// import { NzButtonModule } from 'ng-zorro-antd/button';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [AuthRoutingModule],
})
export class AuthModule {}
