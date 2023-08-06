import * as TransactionRepository from "../repository/transaction.js";
import * as ProductRepository from "../repository/product.js";
import { respError, respSuccess } from "../utils/response.js";
import jwt from "jsonwebtoken";

export const getTrans = async (req, res, next) => {
  try {
    const [result] = await TransactionRepository.getAll();
    respSuccess(res, "success", result);
  } catch (error) {
    next(error);
  }
};

export const getTransById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [result] = await TransactionRepository.getById(id);
    if (result.length > 0) {
      respSuccess(res, "success", result[0]);
    } else {
      respError(res, "Transaction tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const customerGetTransById = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    jwt.verify(header, "secret-iqbal", async (error, data) => {
      if (data.customer_id == req.params.id) {
        const id = req.params.id;
        const [result] = await TransactionRepository.getByIdCustomer(id);
        if (result.length > 0) {
          respSuccess(res, "success", result);
        } else {
          respError(res, "Transaction tidak ditemukan", 404);
        }
      } else {
        respError(res, "Access Forbidden!", 403);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const addTrans = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    jwt.verify(header, "secret-iqbal", async (error, data) => {
      if (data.customer_id == req.body.customer_id) {
        const [getPrice] = await ProductRepository.getById(req.body.product_id);
        if (getPrice[0].qty > 0) {
          const total_price = req.body.qty * getPrice[0].price;

          await TransactionRepository.createData(
            req.body.customer_id,
            req.body.product_id,
            req.body.qty,
            total_price
          );

          const [trans] = [
            {
              customer_id: req.body.customer_id,
              product_id: req.body.product_id,
              qty: req.body.qty,
              total_price: total_price,
            },
          ];

          const qty = getPrice[0].qty - req.body.qty;
          if (qty < 0) {
            respError(
              res,
              `Quantity tidak bisa lebih besar dari ${getPrice[0].qty}`,
              404
            );
          } else {
            await ProductRepository.updateQty(req.body.product_id, qty);

            respSuccess(res, "berhasil menambahkan transaction", trans, 201);
          }
        } else {
          respError(res, "Quantity product kosong", 404);
        }
      } else {
        respError(res, "Access Forbidden!", 403);
      }
    });
  } catch (error) {
    next(error);
  }
};
