import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { AuthResponse } from '../interfaces/auth-response';
import { AuthModel } from '../interfaces/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdapter implements Adapter<AuthResponse, AuthModel> {
    adapt(data: AuthResponse): AuthModel {
        return {
        message: data.message,
        token: data.token,
        fullName: `${data.user.firstName} ${data.user.lastName}`,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        id: data.user._id,
        photo: data.user.photo || 'default-avatar.png',
        };
    }
}
