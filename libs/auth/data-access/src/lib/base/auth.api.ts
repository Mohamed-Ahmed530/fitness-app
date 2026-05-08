import { Observable } from 'rxjs';
import { ChangePasswordRequest, EditProfileRequest, ForgotPasswordRequest, ResetPasswordRequest, SigninRequest, SignupRequest, VerifyResetCodeRequest } from '../interfaces/auth-request';
import { AuthResponse, ChangePasswordResponse, ForgotPasswordResponse, MessageResponse, ProfileDataResponse, ResetPasswordResponse, VerifyResetCodeResponse } from '../interfaces/auth-response';
import { AuthModel } from '../interfaces/auth.model';
import { ProfileModel } from '../interfaces/profile.model';

export abstract class AuthApi {
  abstract signup(data: SignupRequest): Observable<AuthModel>;
  abstract signin(data: SigninRequest): Observable<AuthModel>;

  abstract forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse>;
  abstract verifyResetCode(code: VerifyResetCodeRequest): Observable<VerifyResetCodeResponse>;
  abstract resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse>;
  abstract changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse>;

  abstract getProfileData(): Observable<ProfileModel>;
  abstract editProfile(data: EditProfileRequest): Observable<ProfileModel>;
  abstract uploadProfilePhoto(photo: File): Observable<MessageResponse>;

  abstract logout(): Observable<MessageResponse>;
  abstract deleteMyAccount(): Observable<MessageResponse>;
}
