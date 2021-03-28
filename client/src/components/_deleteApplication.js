import axios from 'axios';

const pathName = window.location.pathname;

export default async (job, token) => {
    return await axios({
      method: 'delete',
      url: `${window.location.pathname}api/jobs`,
      data: {
        job
      },
      headers: {
        'x-auth-token': token
      }
    })
      .then(res => res.data)
      .catch(err => { throw err })
};