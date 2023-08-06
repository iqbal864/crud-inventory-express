import express from "express";
import * as UserService from "./services/user.js";
import * as SupplierRepository from "./services/supplier.js";
import * as ProductRepository from "./services/product.js";

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

// routes untuk supplier
app.get("/supplier", SupplierRepository.getSupplier);
app.post("/supplier", SupplierRepository.addSupplier);
app.put("/supplier/:id", SupplierRepository.updateSupplier);
app.delete("/supplier/:id", SupplierRepository.deleteSupplier);
app.get("/supplier/:id", SupplierRepository.getSupplierById);

// routes untuk product
app.get("/products", ProductRepository.getProduct);
app.post("/product", ProductRepository.addProduct);
app.put("/products/:id", ProductRepository.updateProduct);
app.delete("/products/:id", ProductRepository.deleteProduct);
app.get("/products/:id", ProductRepository.getProductById);

app.listen(port, host, () => {
  console.log(`server REST API berjalan di http://${host}:${port}`);
});
