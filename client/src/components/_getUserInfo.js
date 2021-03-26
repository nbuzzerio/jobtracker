import axios from 'axios';

export default async (token) => {
    return await axios({
      method: 'get',
      url: '/api/users/me',
      headers: {
        'x-auth-token': token
      }
    })
      .then(res => res.data)
      .catch(err => { throw err })
};