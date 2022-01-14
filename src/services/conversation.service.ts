import axios, { AxiosResponse } from 'axios';

import {
  IGetConversationResponse,
  IGetConversationSummaryResponse,
} from '../types';

// prod
// const host = 'https://waste-cash.com/categories';

// dev
const host = 'http://10.0.2.2:3000/conversations';

export const getConversation = async (params: {
  token: string;
  conversationId?: number;
  shopId?: number;
}) => {
  const url = `${host}/${
    params?.conversationId ? params.conversationId : `shop/${params.shopId}`
  }`;

  return (await axios({
    url,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  })) as unknown as AxiosResponse<IGetConversationResponse>;
};

export const getConversations = async (params: { token: string }) => {
  return (await axios({
    url: host,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  })) as unknown as AxiosResponse<IGetConversationSummaryResponse[]>;
};

// export const getConversationMessages = async () => {
//   return (await axios({
//     url: host,
//     method: 'GET',
//   })) as unknown as AxiosResponse<IGetCategoryResponse[]>;
// };
