import Axios from 'axios';
import {
  useMutation,
  MutationConfig,
  useQuery,
  QueryConfig,
} from 'react-query';

export const useAccount = (config: QueryConfig<any> = {}) => {
  const { data: account, ...rest } = useQuery(
    ['account'],
    () => Axios.get('/account'),
    {
      ...config,
    }
  );
  const isAdmin = !!account?.authorities?.includes('ROLE_ADMIN');
  return { account, isAdmin, ...rest };
};

export const useCreateAccount = (config: MutationConfig<any> = {}) => {
  return useMutation(
    ({ login, email, password, langKey = 'en' }) =>
      Axios.post('/register', { login, email, password, langKey }),
    {
      ...config,
    }
  );
};

export const useActivateAccount = (config: MutationConfig<any> = {}) => {
  return useMutation(({ key }) => Axios.get(`/activate?key=${key}`), {
    ...config,
  });
};