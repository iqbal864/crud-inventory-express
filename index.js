import express from "express";

const app = express();
const port = 8082;
const host = "localhost";

app.listen(port, host, () => {
  console.log(`server REST API berjalan di http://${host}:${port}`);
});
