import express from "express";
import * as UserService from "./services/user.js";
import * as SupplierService from "./services/supplier.js";
import * as ProductService from "./services/product.js";
import * as PoService from "./services/po.js";

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
app.get("/supplier", SupplierService.getSupplier);
app.post("/supplier", SupplierService.addSupplier);
app.put("/supplier/:id", SupplierService.updateSupplier);
app.delete("/supplier/:id", SupplierService.deleteSupplier);
app.get("/supplier/:id", SupplierService.getSupplierById);

// routes untuk product
app.get("/products", ProductService.getProduct);
app.post("/product", ProductService.addProduct);
app.put("/products/:id", ProductService.updateProduct);
app.delete("/products/:id", ProductService.deleteProduct);
app.get("/products/:id", ProductService.getProductById);

// routes untuk purchase order
app.get("/po", PoService.getPo);
app.post("/po", PoService.addPo);
app.get("/po/:id", PoService.getPoById);

app.listen(port, host, () => {
  console.log(`server REST API berjalan di http://${host}:${port}`);
});
