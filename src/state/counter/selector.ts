/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '../hooks';

export const counterSelector = useAppSelector(state => state.counter);
