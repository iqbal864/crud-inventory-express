import express from "express";
import * as UserService from "./services/user.js";
import * as SupplierService from "./services/supplier.js";
import * as ProductService from "./services/product.js";
import * as PoService from "./services/po.js";
import { auth } from "./middleware/auth.js";

const app = express();
const port = 8082;
const host = "localhost";

app.use(express.json());

// routes untuk users / karyawan toko
app.post("/login", UserService.login);
app.get("/users", auth, UserService.getUser);
app.post("/users", UserService.addUser);
app.put("/users/:id", auth, UserService.updateUser);
app.delete("/users/:id", auth, UserService.deleteUser);
app.get("/users/:id", auth, UserService.getUserById);

// routes untuk supplier
app.get("/supplier", auth, SupplierService.getSupplier);
app.post("/supplier", auth, SupplierService.addSupplier);
app.put("/supplier/:id", auth, SupplierService.updateSupplier);
app.delete("/supplier/:id", auth, SupplierService.deleteSupplier);
app.get("/supplier/:id", auth, SupplierService.getSupplierById);

// routes untuk product
app.get("/products", auth, ProductService.getProduct);
app.post("/products", auth, ProductService.addProduct);
app.put("/products/:id", auth, ProductService.updateProduct);
app.delete("/products/:id", auth, ProductService.deleteProduct);
app.get("/products/:id", auth, ProductService.getProductById);

// routes untuk purchase order
app.get("/po", auth, PoService.getPo);
app.post("/po", auth, PoService.addPo);
app.get("/po/:id", auth, PoService.getPoById);

app.listen(port, host, () => {
  console.log(`server REST API berjalan di http://${host}:${port}`);
});
