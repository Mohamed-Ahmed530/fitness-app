export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  goal: string;
  photo: string;
  _id: string;
  createdAt: string;
}


export interface ForgotPasswordResponse {
  message: string;
  info: string;
}

export interface VerifyResetCodeResponse {
  status: string;
}

export interface ResetPasswordResponse {
  message: string;
  token: string;
}

export interface ChangePasswordResponse {
  message: string;
  token: string;
}


export interface ProfileDataResponse {
  message: string;
  user: User;
}


export interface MessageResponse {
  message: string;
}
