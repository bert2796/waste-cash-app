import axios, { AxiosResponse } from 'axios';

import { IGetConversationSummaryResponse } from '../types';

// prod
// const host = 'https://waste-cash.com/categories';

// dev
const host = 'http://10.0.2.2:3000/conversations';

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
