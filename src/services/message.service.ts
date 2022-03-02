import axios, { AxiosResponse } from 'axios';

import { host } from '../config';
import { ICreateMessageResponse } from '../types';

const url = `${host}/messages`;

export const createMessage = async (params: {
  token: string;
  conversationId?: number;
  recipient?: number;
  content: string;
}) => {
  const { token, ...rest } = params;

  return (await axios({
    url,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    data: rest,
  })) as unknown as AxiosResponse<ICreateMessageResponse>;
};
