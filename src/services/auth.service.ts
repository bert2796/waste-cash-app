import axios, { AxiosResponse } from 'axios';

import { ILoginResponse, UserRoles } from '../types';

// prod
// const host = 'https://waste-cash.com/auth';

// dev
const host = 'http://10.0.2.2:3000/auth';

export const login = async (params: { username: string; password: string }) => {
  return (await axios({
    url: `${host}/login`,
    method: 'POST',
    data: {
      username: params.username,
      password: params.password,
    },
  })) as unknown as AxiosResponse<ILoginResponse>;
};

export const register = async (params: {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  role: UserRoles;
}) => {
  return (await axios({
    url: `${host}/register`,
    method: 'POST',
    data: params,
  })) as unknown as AxiosResponse<ILoginResponse>;
};
