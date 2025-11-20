export interface User {
  id: number;
  username: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  username: string;
  password: string;
  role?: string;
}