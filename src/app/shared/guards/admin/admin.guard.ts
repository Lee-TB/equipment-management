import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { UserService } from '../../services/user/user.service';

export const AdminGuard: CanMatchFn = () => inject(UserService).isAdmin();
