import axios, { AxiosResponse } from 'axios';

import {
  ProductStatus,
  ICreateProductResponse,
  ICreateProductOfferResponse,
  IGetProductResponse,
} from '../types';

// prod
// const host = 'https://waste-cash.com/products';

// dev
const host = 'http://10.0.2.2:3000/products';

export const createProduct = async (params: {
  token: string;
  formData: FormData;
}) => {
  const { token, formData } = params;

  // return (await axios({
  //   url: `${host}`,
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   data,
  // })) as unknown as AxiosResponse<ICreateProductResponse>;

  return (await axios.post(host, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })) as unknown as AxiosResponse<ICreateProductResponse>;
};

export const getOwnerProducts = async (params: { token: string }) => {
  return (await axios({
    url: `${host}/owners`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  })) as unknown as AxiosResponse<IGetProductResponse[]>;
};

export const getProducts = async () => {
  return (await axios({
    url: host,
    method: 'GET',
  })) as unknown as AxiosResponse<IGetProductResponse[]>;
};

export const getProduct = async (params: { productId: number }) => {
  return (await axios({
    url: `${host}/${params.productId}`,
    method: 'GET',
  })) as unknown as AxiosResponse<IGetProductResponse>;
};

export const createProductOffer = async (params: {
  token: string;
  productId: number;
  price: number;
}) => {
  const { token, productId, price } = params;

  return (await axios({
    url: `${host}/${productId}/offers`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      price,
    },
  })) as unknown as AxiosResponse<ICreateProductOfferResponse>;
};
