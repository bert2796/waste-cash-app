import axios, { AxiosResponse } from 'axios';

import { IGetCategoryResponse } from '../types';

// prod
// const host = 'https://waste-cash.com/categories';

// dev
const host = 'http://10.0.2.2:3000/categories';

export const getCategories = async () => {
  return (await axios({
    url: host,
    method: 'GET',
  })) as unknown as AxiosResponse<IGetCategoryResponse[]>;
};
