import dbPool from "../utils/db.js";

export const getAll = () => {
  const sql =
    "SELECT po_id, supplier.name as supplier, product.name as product, purchase_order.qty, purchase_order.created_at FROM purchase_order JOIN supplier ON purchase_order.supplier_id = supplier.supplier_id JOIN product ON purchase_order.product_id = product.product_id";
  const result = dbPool.query(sql);
  return result;
};

export const getById = (id) => {
  const sql =
    "SELECT po_id, supplier.name as supplier, product.name as product, purchase_order.qty, purchase_order.created_at FROM purchase_order JOIN supplier ON purchase_order.supplier_id = supplier.supplier_id JOIN product ON purchase_order.product_id = product.product_id WHERE po_id = ?";
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
