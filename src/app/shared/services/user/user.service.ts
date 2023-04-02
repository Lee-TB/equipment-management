import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginDataType, User } from '../../schemas/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authURL = 'http://192.168.40.64:5432/api/auth/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  user: User = {
    accessToken: '',
    refreshToken: '',
    userName: '',
    fullName: '',
    imageUrl: '',
    roles: [],
  };

  message = '';
  statusCode?: number;

  constructor(private http: HttpClient) {}

  login(user: LoginDataType) {
    const body = JSON.stringify(user);
    return this.http.post(this.authURL + 'login/', body, this.httpOptions).pipe(
      map((value: any) => {
        this.user = {
          ...value.data[0],
        };
        this.message = value.message;
        this.statusCode = value.statusCode;
        this.setAccessToken(this.user.accessToken);
        this.setRefreshToken(this.user.refreshToken);
        this.setUser(this.user);
        return value;
      })
    );
  }

  logout() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  isLoggedIn() {
    const accessToken = this.getAccessToken();
    return Boolean(accessToken);
  }

  isAdmin() {
    const user = this.getUser();
    return user.roles.includes('Admin');
  }

  /** Lưu trữ user vào local storage */
  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /** Lưu trữ accessToken vào local storage */
  setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  /** Lưu trữ refreshToken vào local storage */
  setRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  /** Lấy accessToken từ local storage */
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  /** Lấy refreshToken từ local storage */
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  /** Lấy user từ local storage */
  getUser() {
    return JSON.parse(<string>localStorage.getItem('user'));
  }

  /** Xóa accessToken trong local storage */
  removeAccessToken() {
    return localStorage.removeItem('accessToken');
  }

  /** Xóa refreshToken trong local storage */
  removeRefreshToken() {
    return localStorage.removeItem('refreshToken');
  }

  /** Xóa removeUser trong local storage */
  removeUser() {
    return localStorage.removeItem('user');
  }
}
