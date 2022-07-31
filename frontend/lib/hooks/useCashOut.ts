import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { cashOut } from '../services';

function useCashOut() {
  const queryClient = useQueryClient();

  return useMutation(cashOut, {
    onSuccess: (data) => {
      queryClient.setQueryData(['balance'], { balance: data.balance });
      alert(JSON.stringify(data, null, 2));
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (err.response?.status === 400) {
        const { message } = err.response.data;
        alert(message);
      }
    },
  });
}

export default useCashOut;
