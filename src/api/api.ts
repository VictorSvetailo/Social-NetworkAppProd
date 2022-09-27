import axios from 'axios';


// export const baseURL = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    // baseURL свойство по умолчанию у instance забит базовый URL
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c'
    }
})


export const usersAPI = {
    getUsers(currentPage: any, pageSize: any) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    }
}



