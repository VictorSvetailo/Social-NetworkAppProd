import axios from 'axios';
import {UsersType} from '../types/types';

// export const baseURL = 'https://social-network.samuraijs.com/api/1.0/'
export const instance = axios.create({
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


export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
