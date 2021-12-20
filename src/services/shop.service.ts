import axios, { AxiosResponse } from 'axios';

import { IUserMeResponse } from '../types';

// prod
// const host = 'https://waste-cash.com/shops';

// dev
const host = 'http://10.0.2.2:3000/shops';

export const getShops = async () => {
  return (await axios({
    url: host,
    method: 'GET',
  })) as unknown as AxiosResponse<IUserMeResponse[]>;
};
