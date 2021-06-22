import { useQuery } from 'react-query';
import { getAddress, getAddressByEmail } from '../firestore/address';

const useAddress = userId =>
  useQuery(['address', { userId }], async () => await getAddress({ userId }));

export const useAddressByEmail = emailId =>
  useQuery(
    ['address', { emailId }],
    async () => await getAddressByEmail({ emailId })
  );

export default useAddress;
