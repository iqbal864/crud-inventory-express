import express from "express";
import * as UserService from "./services/user.js";

const app = express();
const port = 8082;
const host = "localhost";

app.use(express.json());

// routes untuk users / karyawan toko
app.post("/login", UserService.login);
app.get("/users", UserService.getUser);
app.post("/users", UserService.addUser);
app.put("/users/:id", UserService.updateUser);
app.delete("/users/:id", UserService.deleteUser);
app.get("/users/:id", UserService.getUserById);

app.listen(port, host, () => {
  console.log(`server REST API berjalan di http://${host}:${port}`);
});
