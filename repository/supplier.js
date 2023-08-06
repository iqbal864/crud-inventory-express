import dbPool from "../utils/db.js";

export const getAll = () => {
  const sql = "SELECT * FROM supplier";
  const result = dbPool.query(sql);
  return result;
};

export const getById = (id) => {
  const sql = "SELECT * FROM supplier WHERE supplier_id = ?";
  const value = [id];
  const result = dbPool.query(sql, value);
  return result;
};

export const createData = (name, address, email) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO supplier (name, address, email, created_at) VALUE (?, ?, ?, ?)";
  const value = [name, address, email, createdAt];

  return dbPool.query(sql, value);
};

export const updateData = (id, name, address, email) => {
  let updatedAt = new Date();
  const sql =
    "UPDATE supplier SET name = ?, address = ?, email = ?, updated_at = ? where supplier_id = ?";
  const value = [name, address, email, updatedAt, id];
  const result = dbPool.query(sql, value);
  return result;
};

export const deleteData = (id) => {
  const sql = "DELETE FROM supplier where supplier_id = ?";
  const result = dbPool.query(sql, [id]);

  return result;
};
