import { useQuery } from "react-query";
import { getAddress } from "../firestore/address";

const useAddress = (userId) =>
  useQuery(["address", { userId }], async () => await getAddress({userId}));

export default useAddress;
