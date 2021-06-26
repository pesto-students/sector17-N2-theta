import firebase from '../firebase';
import 'firebase/firestore';

const db = firebase.firestore();

// Get order history from email id
const getOrdersHistory = async ({ userId }) => {
  if (!userId) {
    return {};
  }

  const docRef = await db
    .collection('orders')
    .where('uid', '==', userId)
    .get();

    const orders = docRef.docs.map(doc=> ({...doc.data(), id: doc.id}));
  return orders;
};

// Get Order status from Order id
export const getOrderStatus = async ({ orderId }) => {
  if (!orderId) {
    return {};
  }

  const docRef = await db.collection('orders').doc(orderId).get();
  return docRef.data();
};
export default getOrdersHistory;
