import axios from 'axios';

const pathName = window.location.pathname;

export default async (email, password) => {
    return await axios({
      method: 'post',
      url: `${window.location.pathname}api/auth`,
      data: {
            email,
            password
      }
    })
      .then(res => res)
      .catch(err => { throw err })
};