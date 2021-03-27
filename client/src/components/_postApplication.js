import axios from 'axios';

export default async (job, token) => {
    return await axios({
      method: 'post',
      url: '/api/jobs',
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