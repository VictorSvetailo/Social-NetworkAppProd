import {GetItemsType, instance, ResponseType} from './api';
import {profileAPI} from './profile-api';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    follow(userID: string) {
        return instance.post<ResponseType>(`follow/${userID}`).then(res => res.data)
    },
    unFollow(userID: string) {
        return instance.delete<ResponseType>(`follow/${userID}`).then(res => res.data)
    },
    // getProfile(userID: number | null) {
    //     return profileAPI.getProfile(userID)
    // },
}