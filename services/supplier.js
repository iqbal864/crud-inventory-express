import * as SupplierRepository from "../repository/supplier.js";
import { respError, respSuccess } from "../utils/response.js";

export const getSupplier = async (req, res, next) => {
  try {
    const [result] = await SupplierRepository.getAll();
    respSuccess(res, "success", result);
  } catch (error) {
    next(error);
  }
};

export const getSupplierById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [result] = await SupplierRepository.getById(id);
    respSuccess(res, "success", result[0]);
  } catch (error) {
    next(error);
  }
};

export const addSupplier = async (req, res, next) => {
  try {
    await SupplierRepository.createData(
      req.body.name,
      req.body.address,
      req.body.email
    );

    const [supplier] = [
      {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
      },
    ];

    console.log(supplier);
    respSuccess(res, "berhasil menambahkan supplier", supplier, 201);
  } catch (error) {
    next(error);
  }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const id = req.params.id;
    const supplier = await SupplierRepository.updateData(
      id,
      req.body.name,
      req.body.address,
      req.body.email
    );
    console.log(supplier);
    respSuccess(res, "berhasil mengupdate supplier", supplier, 201);
  } catch (error) {
    next(error);
  }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    const id = req.params.id;
    const supplier = await SupplierRepository.deleteData(id);
    console.log(supplier);
    respSuccess(res, "berhasil menghapus supplier", supplier, 201);
  } catch (error) {
    next(error);
  }
};
