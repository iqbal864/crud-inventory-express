import dbPool from "../utils/db.js";

export const getAll = () => {
  const sql = "SELECT * FROM customer";
  const result = dbPool.query(sql);
  return result;
};

export const getById = (id) => {
  const sql = "SELECT * FROM customer WHERE customer_id = ?";
  const value = [id];
  const result = dbPool.query(sql, value);
  return result;
};

export const createData = (name, email, password) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO customer (name, email, password, created_at) VALUE (?, ?, ?, ?)";
  const value = [name, email, password, createdAt];

  return dbPool.query(sql, value);
};

export const updateData = (id, name, email) => {
  let updatedAt = new Date();
  const sql =
    "UPDATE customer SET name = ?, email = ?, updated_at = ? where customer_id = ?";
  const value = [name, email, updatedAt, id];
  const result = dbPool.query(sql, value);
  return result;
};

export const deleteData = (id) => {
  const sql = "DELETE FROM customer where customer_id = ?";
  const result = dbPool.query(sql, [id]);

  return result;
};

export const getByEmail = (email) => {
  const sql = "SELECT * FROM customer where email = ?";
  const result = dbPool.query(sql, [email]);

  return result;
};
