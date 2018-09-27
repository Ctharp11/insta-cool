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
export const getUserPosts = (id) => {
    return app.get(`/api/posts/${id}`);
}
export const likePost = (id, sendLike, userId) => {
    const postData = {
        id,
        sendLike,
        userId
    }
    return app.post(`api/liked/${id}`, postData)
}

//facebook login
export const postUser = (token) => {
    return app.post('/users/oauth/facebook', { "access_token": token })
}
export const getUser = (usertoken) => {
    return app.get('/users/secret', {
        headers: {
            'Authorization': usertoken,
            'credentials': 'same-origin',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

