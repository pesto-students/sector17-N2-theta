import { paginationQuery } from './helpers';
import firebase from '../firebase';
import 'firebase/firestore';

const db = firebase.firestore();
export const getSellers = async ({
  offset = 0,
  limit = 10,
  orderBy = 'id',
  category = '',
  id = []
}) => {
  const where = [];
  /** Categories */
  if (!!category) {
    where.push(['category', '==', category]);
  }

  /** ids */
  if (Array.isArray(id) && id.length > 0) {
    where.push(['id', 'in', id]);
  }
  const result = await paginationQuery(
    'sellers',
    orderBy,
    offset,
    limit,
    where
  );
  return result;
};

// Get Seller by Seller Id
export const getSingleSellerEntity = async ({ sellerId }) => {
  if (!sellerId) {
    return {};
  }

  const docRef = await db.collection('sellers').doc(sellerId).get();
  return docRef.data();
};

export const getProducts = async ({
  offset = 0,
  limit = 10,
  orderBy = 'sku',
  category = '',
  sku = []
}) => {
  const where = [];
  /** Categories */
  if (!!category) {
    where.push(['category', '==', category]);
  }

  /** ids */
  if (Array.isArray(sku) && sku.length > 0) {
    where.push(['sku', 'in', sku]);
  }

  return await paginationQuery('products', orderBy, offset, limit, where);
};
