import axios, { AxiosResponse } from 'axios';

import { IGetNotificationResponse } from '../types';

// prod
// const host = 'https://waste-cash.com/notifications';

// dev
const host = 'http://10.0.2.2:3000/notifications';

export const getNotifications = async (params: { token: string }) => {
  return (await axios({
    url: host,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  })) as unknown as AxiosResponse<IGetNotificationResponse[]>;
};

export const updateNotification = async (params: {
  isSeen: boolean;
  notificationId: number;
  token: string;
}) => {
  return (await axios({
    url: `${host}/${params.notificationId}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
    data: {
      isSeen: params.isSeen,
    },
  })) as unknown as AxiosResponse<IGetNotificationResponse>;
};
