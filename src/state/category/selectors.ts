import { createSelector } from '@reduxjs/toolkit';

import { ICategoryState, ICategory } from '../../types';
import { RootState } from '../store';

const rootSelector = createSelector(
  (state: RootState): ICategoryState => state.category,
  (category: ICategoryState) => category,
);

export const categoryListSelector = createSelector(
  rootSelector,
  (category: ICategoryState): ICategory[] => category.list,
);

export const categoryErrorSelector = createSelector(
  rootSelector,
  (category: ICategoryState): string => category.error,
);

export const isLoadingSelector = createSelector(
  rootSelector,
  (category: ICategoryState): boolean => category.isLoading,
);
