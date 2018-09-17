import axios from 'axios';
import FormData from 'form-data'

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
    return axios.get(`/api/${id}`)
}