import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/conversations`;

export const getConversation = async (params: {
  token: string;
  conversationId?: number;
  shopId?: number;
}) => {
  const urlToUse = `${url}/${
    params?.conversationId ? params.conversationId : `shop/${params.shopId}`
  }`;

  return (await axios({
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    method: 'GET',
    url: urlToUse,
  })) as unknown as AxiosResponse<Objects.Conversation>;
};

export const getConversations = async (params: { token: string }) => {
  return (await axios({
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    method: 'GET',
    url,
  })) as unknown as AxiosResponse<Objects.ConversationSummary[]>;
};

// export const getConversationMessages = async () => {
//   return (await axios({
//     url: host,
//     method: 'GET',
//   })) as unknown as AxiosResponse<IGetCategoryResponse[]>;
// };
