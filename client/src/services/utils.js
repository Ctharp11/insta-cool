import axios from 'axios';
import FormData from 'form-data'
// import keys from '../keys';

// export const app = axios.create({
//     baseURL: 'http://localhost:7777/api/',
//     withCredentials: true
// })

export const getPosts = () => {
    return axios.get('/api')
}
export const post = (file, bodyInfo) => {
    let formData = new FormData();
    formData.append('file', file[0], file[0].name);
    formData.append('bodyInfo', JSON.stringify(bodyInfo));
    return axios.post('/api', formData, {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          }
    })
}
export const getSinglePhoto = (id) => {
    return axios.get(`/api/${id}`);
}
export const postUser = (userDetails) => {
    return axios.post('/api/user', userDetails)
}
export const getUser = () => {
    return axios.get('/user');
}
export const removeUser = (id) => {
    console.log(id)
    return axios.delete(`/user/${id}`)
}
