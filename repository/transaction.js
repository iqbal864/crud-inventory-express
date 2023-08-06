import dbPool from "../utils/db.js";

export const getAll = () => {
  const sql =
    "SELECT trans_id, customer.name as customer, product.name as product, transaction.qty, total_price, transaction.created_at FROM transaction JOIN customer ON transaction.customer_id = customer.customer_id JOIN product ON transaction.product_id = product.product_id";
  const result = dbPool.query(sql);
  return result;
};

export const getById = (id) => {
  const sql =
    "SELECT trans_id, customer.name as customer, product.name as product, transaction.qty, total_price, transaction.created_at FROM transaction JOIN customer ON transaction.customer_id = customer.customer_id JOIN product ON transaction.product_id = product.product_id WHERE trans_id = ?";
  const value = [id];
  const result = dbPool.query(sql, value);
  return result;
};

export const createData = (customer_id, product_id, qty, total_price) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO transaction (customer_id, product_id, qty, total_price, created_at) VALUE (?, ?, ?, ?, ?)";
  const value = [customer_id, product_id, qty, total_price, createdAt];

  return dbPool.query(sql, value);
};
