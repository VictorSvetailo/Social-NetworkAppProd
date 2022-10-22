import {instance, ResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from './api';

export type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}
export type LoginResponseType = {
    userId: number
}

export const authAPI = {
    getMe() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },
    login(email: string,
          password: string,
          rememberMe: boolean = false,
          captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data);
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data)
    },
}