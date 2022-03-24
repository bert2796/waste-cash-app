import axios, { AxiosResponse } from 'axios';

import { host } from '../config';

const url = `${host}/products`;

export const createProduct = async (params: {
  token: string;
  formData: FormData;
}) =>
  (await axios.post(url, params.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // eslint-disable-next-line sort-keys-fix/sort-keys-fix
      Authorization: `Bearer ${params.token}`,
    },
  })) as unknown as AxiosResponse<Objects.Product>;

export const getOwnerProducts = async (params: { token: string }) =>
  (await axios({
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    method: 'GET',
    url: `${url}/owners`,
  })) as unknown as AxiosResponse<Objects.Product[]>;

export const getProduct = async (id: number) =>
  (await axios({
    method: 'GET',
    url: `${url}/${id}`,
  })) as unknown as AxiosResponse<Objects.Product>;

export const getProducts = async () =>
  (await axios({
    method: 'GET',
    url: `${url}?status=unsold`,
  })) as unknown as AxiosResponse<Objects.Product[]>;

// export const createProduct = async (params: {
//   token: string;
//   formData: FormData;
// }) => {
//   const { token, formData } = params;

//   // return (await axios({
//   //   url: `${host}`,
//   //   method: 'POST',
//   //   headers: {
//   //     Authorization: `Bearer ${token}`,
//   //   },
//   //   data,
//   // })) as unknown as AxiosResponse<ICreateProductResponse>;

//   return (await axios.post(url, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${token}`,
//     },
//   })) as unknown as AxiosResponse<ICreateProductResponse>;
// };

export const createProductOffer = async (params: {
  token: string;
  productId: number;
  price: number;
}) => {
  const { token, productId, price } = params;

  return (await axios({
    data: {
      price,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    url: `${url}/${productId}/offers`,
  })) as unknown as AxiosResponse<Objects.ProductOffer>;
};

export const updateProductOffer = async (params: {
  token: string;
  productId: number;
  productOfferId: number;
  status: string;
}) => {
  const { token, productId, productOfferId, status } = params;

  return (await axios({
    data: {
      status,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PATCH',
    url: `${url}/${productId}/offers/${productOfferId}`,
  })) as unknown as AxiosResponse<Objects.ProductOffer>;
};
