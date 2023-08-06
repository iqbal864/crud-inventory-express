import * as UserRepository from "../repository/user.js";
import { respError, respSuccess } from "../utils/response.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res, next) => {
  try {
    const [result] = await UserRepository.getAll();
    respSuccess(res, "success", result);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [result] = await UserRepository.getById(id);
    respSuccess(res, "success", result[0]);
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const saltRound = 10;
    bcrypt.hash(req.body.password, saltRound, async (error, hash) => {
      await UserRepository.createData(req.body.name, req.body.email, hash);

      const [user] = [
        {
          name: req.body.name,
          email: req.body.email,
          password: hash,
        },
      ];

      console.log(user);
      respSuccess(res, "berhasil menambahkan user", user, 201);
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserRepository.updateData(
      id,
      req.body.name,
      req.body.email
    );
    console.log(user);
    respSuccess(res, "berhasil mengupdate user", user, 201);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserRepository.deleteData(id);
    console.log(user);
    respSuccess(res, "berhasil menghapus user", user, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const [user] = await UserRepository.getByEmail(req.body.email);
    console.log(user);
    if (user.length > 0) {
      let password = req.body.password;
      let hasedPass = user[0].password;
      bcrypt.compare(password, hasedPass, (error, result) => {
        if (result) {
          respSuccess(res, "Login berhasil", user[0]);
        } else {
          respError(res, "Email atau password salah", 401);
        }
      });
    } else {
      respError(res, "User tidak ditemukan", 404);
    }
  } catch (err) {
    next(err);
  }
};
