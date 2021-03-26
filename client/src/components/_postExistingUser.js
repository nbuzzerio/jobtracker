import axios from 'axios';

export default async (email, password) => {
    return await axios({
      method: 'post',
      url: '/api/auth',
      data: {
            email,
            password
      }
    })
      .then(res => res)
      .catch(err => { throw err })
};