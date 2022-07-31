import { useQuery } from 'react-query';
import { getBalance } from '../services';

function useBalance() {
  return useQuery(['balance'], getBalance, { select: (data) => data });
}

export default useBalance;
