import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDataType } from 'src/app/shared/schemas/user';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading = false;
  hidePassword = true;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    const loginData: LoginDataType = {
      username: this.loginForm.value.username || '',
      password: this.loginForm.value.password || '',
    };

    this.userService.login(loginData).subscribe((value: any) => {
      if (value) {
        this.loading = false;
        this.router.navigate(['']);
      }
    });
  }
}
