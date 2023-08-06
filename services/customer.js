import * as CustomerRepository from "../repository/customer.js";
import { respError, respSuccess } from "../utils/response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getCustomer = async (req, res, next) => {
  try {
    const [result] = await CustomerRepository.getAll();
    respSuccess(res, "success", result);
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [result] = await CustomerRepository.getById(id);
    if (result.length > 0) {
      respSuccess(res, "success", result[0]);
    } else {
      respError(res, "Customer tidak ditemukan", 404);
    }
  } catch (error) {
    next(error);
  }
};

export const customerGetProfile = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const id = req.params.id;
    jwt.verify(header, "secret-iqbal", async (error, data) => {
      if (data.customer_id == id) {
        const [result] = await CustomerRepository.getById(id);
        if (result.length > 0) {
          respSuccess(res, "success", result[0]);
        } else {
          respError(res, "Customer tidak ditemukan", 404);
        }
      } else {
        respError(res, "Access Forbidden!", 403);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const addCustomer = async (req, res, next) => {
  try {
    const saltRound = 10;
    bcrypt.hash(req.body.password, saltRound, async (error, hash) => {
      await CustomerRepository.createData(req.body.name, req.body.email, hash);

      const [customer] = [
        {
          name: req.body.name,
          email: req.body.email,
          password: hash,
        },
      ];

      console.log(customer);
      respSuccess(res, "berhasil menambahkan customer", customer, 201);
    });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await CustomerRepository.updateData(
      id,
      req.body.name,
      req.body.email
    );
    console.log(customer);
    respSuccess(res, "berhasil mengupdate customer", customer, 201);
  } catch (error) {
    next(error);
  }
};

export const customerUpdateProfile = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const id = req.params.id;
    jwt.verify(header, "secret-iqbal", async (error, data) => {
      if (data.customer_id == id) {
        const customer = await CustomerRepository.updateData(
          id,
          req.body.name,
          req.body.email
        );
        console.log(customer);
        respSuccess(res, "berhasil mengupdate customer", customer, 201);
      } else {
        respError(res, "Access Forbidden!", 403);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await CustomerRepository.deleteData(id);
    console.log(customer);
    respSuccess(res, "berhasil menghapus customer", customer, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const [customer] = await CustomerRepository.getByEmail(req.body.email);
    if (customer.length > 0) {
      let password = req.body.password;
      let hasedPass = customer[0].password;
      bcrypt.compare(password, hasedPass, (error, result) => {
        const accessToken = jwt.sign(
          {
            customer_id: customer[0].customer_id,
          },
          "secret-iqbal", // contoh secret
          {
            expiresIn: "15m",
          }
        );

        const [data_customer] = [
          {
            customer_id: customer[0].customer_id,
            name: customer[0].name,
            email: customer[0].email,
            password: customer[0].password,
            token: accessToken,
          },
        ];

        if (result) {
          respSuccess(res, "Login berhasil", data_customer);
        } else {
          respError(res, "Email atau password salah", 401);
        }
      });
    } else {
      respError(res, "Customer tidak ditemukan", 404);
    }
  } catch (err) {
    next(err);
  }
};
