import { getById } from "../repository/user.js";
import { respError } from "../utils/response.js";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (header != null) {
      jwt.verify(header, "secret-iqbal", async (error, data) => {
        if (error) {
          respError(res, "Access Forbidden!", 403);
        } else {
          const [result] = await getById(data.user_id);
          if (result.length > 0) {
            next();
          } else {
            respError(res, "Access Forbidden!", 403);
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
