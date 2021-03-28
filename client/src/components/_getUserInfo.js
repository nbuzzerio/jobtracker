import axios from 'axios';

const pathName = window.location.pathname;

export default async (token) => {
    return await axios({
      method: 'get',
      url: `${window.location.pathname}api/users/me`,
      headers: {
        'x-auth-token': token
      }
    })
      .then(res => res.data)
      .catch(err => { throw err })
};