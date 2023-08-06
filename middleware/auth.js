import { respError } from "../utils/response.js";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (header != null) {
      jwt.verify(header, "secret-iqbal", (error, data) => {
        if (error) {
          respError(res, "Access Forbidden!", 403);
        } else {
          next();
        }
      });
    } else {
      respError(res, "Header authorization tidak valid", 401);
    }
  } catch (error) {
    next(error);
  }
};
