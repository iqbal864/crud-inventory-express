import * as PoRepository from "../repository/po.js";
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
    respSuccess(res, "success", result[0]);
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
        name: req.body.supplier_id,
        price: req.body.product_id,
        price: req.body.qty,
      },
    ];

    console.log(po);
    respSuccess(res, "berhasil menambahkan purchase_order", po, 201);
  } catch (error) {
    next(error);
  }
};
