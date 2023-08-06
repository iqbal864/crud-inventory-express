import * as ProductRepository from "../repository/product.js";
import { respError, respSuccess } from "../utils/response.js";

export const getProduct = async (req, res, next) => {
  try {
    const [result] = await ProductRepository.getAll();
    respSuccess(res, "success", result);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [result] = await ProductRepository.getById(id);
    if (result.length > 0) {
      respSuccess(res, "success", result[0]);
    } else {
      respError(res, "Product tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    await ProductRepository.createData(req.body.name, req.body.price);

    const [product] = [
      {
        name: req.body.name,
        price: req.body.price,
      },
    ];

    console.log(product);
    respSuccess(res, "berhasil menambahkan product", product, 201);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductRepository.updateData(
      id,
      req.body.name,
      req.body.price
    );
    console.log(product);
    respSuccess(res, "berhasil mengupdate product", product, 201);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductRepository.deleteData(id);
    console.log(product);
    respSuccess(res, "berhasil menghapus product", product, 201);
  } catch (error) {
    next(error);
  }
};
