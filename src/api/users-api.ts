import {GetItemsType, instance, ResponseType} from './api';
import {profileAPI} from './profile-api';





export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '': `&friend=${friend}`)).then(res => res.data)
    },
    follow(userID: string) {
        return instance.post<ResponseType>(`follow/${userID}`).then(res => res.data)
    },
    unFollow(userID: string) {
        return instance.delete<ResponseType>(`follow/${userID}`).then(res => res.data)
    },
}