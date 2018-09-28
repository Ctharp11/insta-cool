import axios from 'axios';
import FormData from 'form-data'

export const getPosts = () => {
    return axios.get('/api');
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
export const getUserPosts = (id) => {
    return axios.get(`/api/posts/${id}`);
}
export const likePost = (postid, userid, likeStatus) => {
    const body = {
        userid,
        likeStatus
    }
    return axios.post(`/api/liked/${postid}`, body)
}
export const commentPost = (postid, userinfo) => {
    return axios.post(`/api/comment/${postid}`, {userinfo})
}

//facebook login
export const postUser = (token) => {
    return axios.post('/users/oauth/facebook', { "access_token": token })
}
export const getUser = (usertoken) => {
    return axios.get('/users/secret', {    
        headers: {
            'Authorization': usertoken,
            'credentials': 'same-origin',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}

