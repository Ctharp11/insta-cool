import axios from 'axios';
import FormData from 'form-data'

export const getPosts = () => {
    return axios.get('/api')
}

export const post = (bodyInfo, file) => {
    console.log(bodyInfo, file)
    // new Blob([photo[0]], { type: ['image/gif', 'image/png', 'image/jpeg'] })
    let data = new FormData();
    data.append('file', file, file.fileName);
    return axios.post('/api', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': data.type
        }
      })
}