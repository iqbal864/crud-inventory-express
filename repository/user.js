import dbPool from "../utils/db.js";

export const getAll = () => {
  const sql = "SELECT * FROM users";
  const result = dbPool.query(sql);
  return result;
};

export const getById = (id) => {
  const sql = "SELECT * FROM users WHERE user_id = ?";
  const value = [id];
  const result = dbPool.query(sql, value);
  return result;
};

export const createData = (name, email, password) => {
  let createdAt = new Date();
  const sql =
    "INSERT INTO users (name, email, password, created_at) VALUE (?, ?, ?, ?)";
  const value = [name, email, password, createdAt];

  return dbPool.query(sql, value);
};

export const updateData = (id, name, email) => {
  let updatedAt = new Date();
  const sql =
    "UPDATE users SET name = ?, email = ?, updated_at = ? where user_id = ?";
  const value = [name, email, updatedAt, id];
  const result = dbPool.query(sql, value);
};

export const deleteData = (id) => {
  const sql = "DELETE FROM users where user_id = ?";
  const result = dbPool.query(sql, [id]);

  return result;
};

export const getByEmail = (email) => {
  const sql = "SELECT * FROM users where email = ?";
  const result = dbPool.query(sql, [email]);

  return result;
};
