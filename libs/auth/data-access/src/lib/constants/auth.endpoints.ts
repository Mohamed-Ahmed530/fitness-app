export const AuthEndpoints = {
  SignUp: 'auth/signup',
  SignIn: 'auth/signin',
  ForgotPassword: 'auth/forgotPassword',
  VerifyResetCode: 'auth/verifyResetCode',
  ResetPassword: 'auth/resetPassword',
  ChangePassword: 'auth/change-password',
  ProfileData: 'auth/profile-data',
  EditProfile: 'auth/editProfile',
  UploadPhoto: 'auth/upload-photo',
  Logout: 'auth/logout',
  DeleteMyAccount: 'auth/deleteMe',
} as const;