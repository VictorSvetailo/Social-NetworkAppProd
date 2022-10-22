import {ProfileType} from '../redux/profile-reducer';
import {instance, ResponseType} from './api';
import {PhotosType} from '../types/types';


type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userID: number | null) {
        return instance.get<ProfileType>(`profile/${userID}`).then(res => res.data)
    },
    getStatus(userID: string) {
        return instance.get<string>(`profile/status/${userID}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status: status}).then(res => res.data)
    },
    savePhoto(photoFile: string) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile).then(res => res.data)
    }
}