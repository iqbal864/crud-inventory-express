import dbPool from "../utils/db.js";

export const getAll = () => {
  const sql = "SELECT * FROM product";
  const result = dbPool.query(sql);
  return result;
};

export const getById = (id) => {
  const sql = "SELECT * FROM product WHERE product_id = ?";
  const value = [id];
  const result = dbPool.query(sql, value);
  return result;
};

export const createData = (name, price) => {
  let createdAt = new Date();
  let qty = 0;
  const sql =
    "INSERT INTO product (name, price, qty, created_at) VALUE (?, ?, ?, ?)";
  const value = [name, price, qty, createdAt];

  return dbPool.query(sql, value);
};

export const updateData = (id, name, price) => {
  let updatedAt = new Date();
  const sql =
    "UPDATE product SET name = ?, price = ?, updated_at = ? where product_id = ?";
  const value = [name, price, updatedAt, id];
  const result = dbPool.query(sql, value);
  return result;
};

export const deleteData = (id) => {
  const sql = "DELETE FROM product where product_id = ?";
  const result = dbPool.query(sql, [id]);

  return result;
};

export const updateQty = (id, qty) => {
  let updatedAt = new Date();
  const sql = "UPDATE product SET qty = ?, updated_at = ? where product_id = ?";
  const value = [qty, updatedAt, id];
  const result = dbPool.query(sql, value);
  return result;
};
