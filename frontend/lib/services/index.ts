import axios from 'axios';
import { Balance, RollData, Transaction } from '../../interfaces';

const client = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export const getBalance = () => {
  return client.get<Balance>('/balance').then((res) => res.data);
};

export const start = () => {
  return client.post<Balance>('/start').then((res) => res.data);
};

export const roll = () => {
  return client.post<RollData>('/roll').then((res) => res.data);
};

export const cashOut = () => {
  return client.post<Transaction>('/cashout').then((res) => res.data);
};
