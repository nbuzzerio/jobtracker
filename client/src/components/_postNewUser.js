import axios from 'axios';

const pathName = window.location.pathname;

export default async (name, email, password) => {
    return await axios({
      method: 'post',
      url: `${window.location.pathname}api/users`,
      data: {
            name,
            email,
            password
      }
    })
      .then(res => res)
      .catch(err => { throw err })
};