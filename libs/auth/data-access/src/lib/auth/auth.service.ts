import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthApi } from '../base/auth.api';
import { map, Observable } from 'rxjs';
import { BASE_URL } from '../base/api.config';
import { AuthEndpoints } from '../constants/auth.endpoints';
import { ChangePasswordRequest, EditProfileRequest, ForgotPasswordRequest, ResetPasswordRequest, SigninRequest, SignupRequest, VerifyResetCodeRequest } from '../interfaces/auth-request';
import { AuthResponse, ChangePasswordResponse, ForgotPasswordResponse, MessageResponse, ProfileDataResponse, ResetPasswordResponse, VerifyResetCodeResponse } from '../interfaces/auth-response';
import { AuthModel } from '../interfaces/auth.model';
import { AuthApiAdapter } from '../adapters/auth-api.adapter';
import { ProfileAdapter } from '../adapters/profile.adapter';
import { ProfileModel } from '../interfaces/profile.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthApi {

  private readonly httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(BASE_URL);
  private readonly authApiAdapter = inject(AuthApiAdapter);
  private readonly profileAdapter = inject(ProfileAdapter);

  isLoggedIn = signal(false);

  signup(data: SignupRequest): Observable<AuthModel> {
    return this.httpClient.post<AuthResponse>(`${this._BASE_URL}${AuthEndpoints.SignUp}`, data)
    .pipe(map((res) => this.authApiAdapter.adapt(res)));
  }

  signin(data: SigninRequest): Observable<AuthModel> {
    return this.httpClient.post<AuthResponse>(`${this._BASE_URL}${AuthEndpoints.SignIn}`, data)
    .pipe(map((res) => this.authApiAdapter.adapt(res)));
  }


  forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.httpClient.post<ForgotPasswordResponse>(`${this._BASE_URL}${AuthEndpoints.ForgotPassword}`, data);
  }

  verifyResetCode(code: VerifyResetCodeRequest): Observable<VerifyResetCodeResponse> {
    return this.httpClient.post<VerifyResetCodeResponse>(`${this._BASE_URL}${AuthEndpoints.VerifyResetCode}`, code);
  }

  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.httpClient.put<ResetPasswordResponse>(`${this._BASE_URL}${AuthEndpoints.ResetPassword}`, data);
  }

  changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this.httpClient.patch<ChangePasswordResponse>(`${this._BASE_URL}${AuthEndpoints.ChangePassword}`, data);
  }


  getProfileData(): Observable<ProfileModel> {
    return this.httpClient.get<ProfileDataResponse>(`${this._BASE_URL}${AuthEndpoints.ProfileData}`)
    .pipe(map((res) => this.profileAdapter.adapt(res)));
  }

  editProfile(data: EditProfileRequest): Observable<ProfileModel> {
    return this.httpClient.put<ProfileDataResponse>(`${this._BASE_URL}${AuthEndpoints.EditProfile}`, data)
    .pipe(map((res) => this.profileAdapter.adapt(res)));  
  }

  uploadProfilePhoto(photo: File): Observable<MessageResponse> {
    const formData = new FormData();
    formData.append('photo', photo);
    return this.httpClient.put<MessageResponse>(`${this._BASE_URL}${AuthEndpoints.UploadPhoto}`, formData);
  }


  logout(): Observable<MessageResponse> {
    return this.httpClient.get<MessageResponse>(`${this._BASE_URL}${AuthEndpoints.Logout}`);
  }

  
  deleteMyAccount(): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(`${this._BASE_URL}${AuthEndpoints.DeleteMyAccount}`);
  }

}
