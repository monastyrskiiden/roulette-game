import { useMutation, useQueryClient } from 'react-query';
import { roll } from '../services';

function useRoll() {
  const queryClient = useQueryClient();

  return useMutation(roll, {
    onSuccess: (data) => {
      queryClient.setQueryData(['balance'], { balance: data.balance });
    },
  });
}

export default useRoll;
