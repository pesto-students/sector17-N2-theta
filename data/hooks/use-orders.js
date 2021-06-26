import { useQuery } from "react-query";
import getOrdersHistory, { getOrderStatus } from "../firestore/orders-history";

const useOrderStatus = (orderId) =>
  useQuery(["orders", { orderId }], async () => await getOrderStatus({orderId}));


export const useOrderHistory = (userId) =>
    useQuery(["orders", { userId }], async () => await getOrdersHistory({userId}));

export default useOrderStatus;
