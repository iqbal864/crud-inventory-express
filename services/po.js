import * as PoRepository from "../repository/po.js";
import * as ProductRepository from "../repository/product.js";
import { respError, respSuccess } from "../utils/response.js";

export const getPo = async (req, res, next) => {
  try {
    const [result] = await PoRepository.getAll();
    respSuccess(res, "success", result);
  } catch (error) {
    next(error);
  }
};

export const getPoById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [result] = await PoRepository.getById(id);
    if (result.length > 0) {
      respSuccess(res, "success", result[0]);
    } else {
      respError(res, "Purchase order tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const addPo = async (req, res, next) => {
  try {
    await PoRepository.createData(
      req.body.supplier_id,
      req.body.product_id,
      req.body.qty
    );

    const [po] = [
      {
        supplier_id: req.body.supplier_id,
        product_id: req.body.product_id,
        qty: req.body.qty,
      },
    ];

    console.log(po);

    const [getQty] = await ProductRepository.getById(req.body.product_id);

    const qty = req.body.qty + getQty[0].qty;

    await ProductRepository.updateQty(req.body.product_id, qty);

    respSuccess(res, "berhasil menambahkan purchase_order", po, 201);
  } catch (error) {
    next(error);
  }
};
