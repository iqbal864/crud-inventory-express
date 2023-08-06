import dbPool from "../utils/db.js";

export const getAll = () => {
  const sql = "SELECT * FROM purchase_order";
  const result = dbPool.query(sql);
  return result;
};

export const getById = (id) => {
  const sql = "SELECT * FROM purchase_order WHERE po_id = ?";
  const value = [id];
  const result = dbPool.query(sql, value);
  return result;
};

export const createData = (supplier_id, product_id, qty) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO purchase_order (supplier_id, product_id, qty, created_at) VALUE (?, ?, ?, ?)";
  const value = [supplier_id, product_id, qty, createdAt];

  return dbPool.query(sql, value);
};
