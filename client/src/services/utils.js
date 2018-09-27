import axios from 'axios';
import FormData from 'form-data'
// import keys from '../keys';

const app = axios.create({
    baseURL: 'http://localhost:7777',
    withCredentials: true
})

export const getPosts = () => {
    return app.get('/api');
}
export const post = (file, bodyInfo) => {
    let formData = new FormData();
    formData.append('file', file[0], file[0].name);
    formData.append('bodyInfo', JSON.stringify(bodyInfo));
    return app.post('/api', formData, {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          }
    })
}
export const getSinglePhoto = (id) => {
    return app.get(`/api/${id}`);
}
export const postUser = (userDetails) => {
    return app.post('/users/secret', userDetails)
}
export const getUser = (userDetails) => {
    return app.post('/users/secret', userDetails)
}

