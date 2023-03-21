export interface LoginDataType {
  username: string;
  password: string;
}

export interface User {
  accessToken: string;
  fullName: string;
  imageUrl: string;
  refreshToken: string;
  roles: string[];
  userName: string;
}
