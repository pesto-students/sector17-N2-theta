import { useQuery } from "react-query";
import { getAddress } from "../firestore/address";

const useAddress =  () =>
  useQuery(["address"], async (userId) => await getAddress(userId));

export default useAddress;
