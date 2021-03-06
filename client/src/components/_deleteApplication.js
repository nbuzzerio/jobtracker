import axios from 'axios';

const pathName = window.location.pathname;

export default async (job, date, token) => {
    return await axios({
      method: 'delete',
      url: `${window.location.pathname}api/jobs`,
      data: {
        job,
        date
      },
      headers: {
        'x-auth-token': token
      }
    })
      .then(res => res.data)
      .catch(err => { throw err })
};