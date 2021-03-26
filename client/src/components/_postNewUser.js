import axios from 'axios';

export default async (name, email, password) => {
    return await axios({
      method: 'post',
      url: '/api/users',
      data: {
            name,
            email,
            password
      }
    })
      .then(res => res)
      .catch(err => { throw err })
};