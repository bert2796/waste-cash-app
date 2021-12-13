import axios, { AxiosResponse } from 'axios';

import { IUserMeResponse } from '../types';

// prod
// const host = 'https://waste-cash.com/users';

// dev
const host = 'http://10.0.2.2:3000/users';

export const me = async (params: { token: string }) => {
  return (await axios({
    url: `${host}/me`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  })) as unknown as AxiosResponse<IUserMeResponse>;
};
