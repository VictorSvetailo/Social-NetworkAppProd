import axios from 'axios';


// export const baseURL = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    // baseURL свойство по умолчанию у instance забит базовый URL
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c_'
    }
})


export const usersAPI = {
    getUsers(currentPage: any, pageSize: any) {
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
    getStatus(userID: any) {
        return instance.get(`profile/status/${userID}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: string) {

        return instance.put(`profile`, profile)
    }

}

export const authAPI = {
    getMe() {
        return instance.get(`auth/me`);
    },

    login(email: string,
          password: string,
          rememberMe: boolean = false,
          // @ts-ignore
          captcha: string = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
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






