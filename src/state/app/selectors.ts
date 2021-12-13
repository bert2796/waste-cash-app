import { createSelector } from '@reduxjs/toolkit';

import { IAppState, UserRoles } from '../../types';
import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): IAppState => state.app,
  (app: IAppState) => app,
);

export const appErrorSelector = createSelector(
  rootSelector,
  (app: IAppState): string => app.error,
);

export const isInitializeSelector = createSelector(
  rootSelector,
  (app: IAppState): boolean => app.isInitialize,
);

export const roleSelector = createSelector(
  rootSelector,
  (app: IAppState): UserRoles => app.role,
);
