import axios from 'axios';

const pathName = window.location.pathname;

export default async (job, date, index, token) => {
    return await axios({
      method: 'put',
      url: `${window.location.pathname}api/jobs`,
      data: {
        job,
        date,
        index
      },
      headers: {
        'x-auth-token': token
      }
    })
      .then(res => res.data)
      .catch(err => { throw err })
};