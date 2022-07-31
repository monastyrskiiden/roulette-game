import { useMutation, useQueryClient } from 'react-query';
import { start } from '../services';

function useStart() {
  const queryClient = useQueryClient();

  return useMutation(() => start(), {
    onSuccess: (data) => {
      queryClient.setQueryData(['balance'], data);
    },
  });
}

export default useStart;
