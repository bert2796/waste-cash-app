import axios, { AxiosResponse } from 'axios';

import { ICreateMessageResponse } from '../types';

// prod
// const host = 'https://waste-cash.com/categories';

// dev
const host = 'http://10.0.2.2:3000/messages';

export const createMessage = async (params: {
  token: string;
  conversationId?: number;
  recipient?: number;
  content: string;
}) => {
  const { token, ...rest } = params;

  return (await axios({
    url: host,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    data: rest,
  })) as unknown as AxiosResponse<ICreateMessageResponse>;
};
