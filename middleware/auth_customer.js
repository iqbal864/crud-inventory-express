import { getById } from "../repository/customer.js";
import { respError } from "../utils/response.js";
import jwt from "jsonwebtoken";

export const auth_customer = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (header != null) {
      jwt.verify(header, "secret-iqbal", async (error, data) => {
        if (error) {
          respError(res, "Access Forbidden!", 403);
          next();
        } else {
          const [result] = await getById(data.customer_id);
          if (result.length > 0) {
            next();
          } else {
            respError(res, "Access Forbidden!", 403);
            next();
          }
        }
      });
    } else {
      respError(res, "Header authorization tidak valid", 401);
    }
  } catch (error) {
    next(error);
  }
};
