export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  age: number;
  goal: string;
  activityLevel: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}


export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetCodeRequest {
  resetCode: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}


export interface EditProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  weight?: number;
  height?: number;
  activityLevel?: string;
  goal?: string;
}
