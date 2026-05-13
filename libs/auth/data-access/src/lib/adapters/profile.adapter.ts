import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { ProfileDataResponse } from '../interfaces/auth-response';
import { ProfileModel } from '../interfaces/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileAdapter implements Adapter<ProfileDataResponse, ProfileModel> {
    adapt(data: ProfileDataResponse): ProfileModel {
        return {
        message: data.message,
        fullName: `${data.user.firstName} ${data.user.lastName}`,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        id: data.user._id,
        gender: data.user.gender,
        age: data.user.age,
        weight: data.user.weight,
        height: data.user.height,
        activityLevel: data.user.activityLevel,
        goal: data.user.goal,
        photo: data.user.photo || 'default-avatar.png',
        };
    }
}
