import { useQuery } from "react-query";
import getOrdersHistory, { getOrderStatus } from "../firestore/orders-history";

const useOrderStatus = (orderId) =>
  useQuery(["orders", { orderId }], async () => await getOrderStatus({orderId}));


export const useOrderHistory = (emailId) =>
    useQuery(["orders", { emailId }], async () => await getOrdersHistory({emailId}));

export default useOrderStatus;
