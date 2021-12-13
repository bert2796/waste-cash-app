import { createSelector } from '@reduxjs/toolkit';

import { IUserState, IUser } from '../../types';
import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): IUserState => state.user,
  (user: IUserState) => user,
);

export const userDataSelector = createSelector(
  rootSelector,
  (user: IUserState): IUser => user.data,
);

export const userErrorSelector = createSelector(
  rootSelector,
  (user: IUserState): string => user.error,
);

export const tokenSelector = createSelector(
  rootSelector,
  (user: IUserState): string => user.token,
);

export const isAuthSelector = createSelector(
  rootSelector,
  userDataSelector,
  (user: IUserState, userData: IUser): boolean =>
    Boolean(user.token) && Boolean(userData.id),
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (user: IUserState): boolean => user.isLoading,
);
