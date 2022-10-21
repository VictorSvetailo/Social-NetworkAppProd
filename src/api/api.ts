import axios from 'axios';
import {ProfileType} from '../redux/profile-reducer';


// export const baseURL = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    // baseURL свойство по умолчанию у instance забит базовый URL
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c'
    }
})


export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10,
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userID: string) {
        return instance.post(`follow/${userID}`)
    },
    unFollow(userID: string) {
        return instance.delete(`follow/${userID}`)
    },
    getProfile(userID: string) {
        // console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(userID)
        // return instance.get(`profile/${userID}`)
    },
}

export const profileAPI = {
    getProfile(userID: string) {
        return instance.get(`profile/${userID}`)
    },
    getStatus(userID: string) {
        return instance.get(`profile/status/${userID}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile: string) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    }

}



type MeResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
export const authAPI = {
    getMe() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string,
          password: string,
          rememberMe: boolean = false,
          captcha: string | null = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    },
}

// authAPI.getMe().then((res) => res.data.)

// instance.get<string>(`auth/me`).then((res) => res.data.toUpperCase())





