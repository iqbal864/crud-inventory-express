export const respSuccess = (res, message, data, status = 200) => {
  return res.status(status).json({
    code: status,
    message: message,
    data: data,
  });
};

export const respError = (res, message, status = 401) => {
  return res.status(status).json({
    code: status,
    message: message,
  });
};
