import express from "express";
import * as UserService from "./services/user.js";
import * as SupplierService from "./services/supplier.js";
import * as ProductService from "./services/product.js";
import * as PoService from "./services/po.js";
import * as CustomerService from "./services/customer.js";
import * as TransactionService from "./services/transaction.js";
import { auth } from "./middleware/auth.js";
import { auth_customer } from "./middleware/auth_customer.js";

const app = express();
const port = 8082;
const host = "localhost";

app.use(express.json());

// routes untuk users / karyawan toko (role users / karyawan toko)
app.post("/login", UserService.login);
app.get("/users", auth, UserService.getUser);
app.post("/users", UserService.addUser);
app.put("/users/:id", auth, UserService.updateUser);
app.delete("/users/:id", auth, UserService.deleteUser);
app.get("/users/:id", auth, UserService.getUserById);

// routes untuk supplier (role users / karyawan toko)
app.get("/supplier", auth, SupplierService.getSupplier);
app.post("/supplier", auth, SupplierService.addSupplier);
app.put("/supplier/:id", auth, SupplierService.updateSupplier);
app.delete("/supplier/:id", auth, SupplierService.deleteSupplier);
app.get("/supplier/:id", auth, SupplierService.getSupplierById);

// routes untuk product (role users / karyawan toko)
app.get("/products", auth, ProductService.getProduct);
app.post("/products", auth, ProductService.addProduct);
app.put("/products/:id", auth, ProductService.updateProduct);
app.delete("/products/:id", auth, ProductService.deleteProduct);
app.get("/products/:id", auth, ProductService.getProductById);

// routes untuk purchase order (role users / karyawan toko)
app.get("/po", auth, PoService.getPo);
app.post("/po", auth, PoService.addPo);
app.get("/po/:id", auth, PoService.getPoById);

// routes untuk customer (role users / karyawan toko)
app.post("/customer", CustomerService.addCustomer);
app.get("/customer", auth, CustomerService.getCustomer);
app.put("/customer/:id", auth, CustomerService.updateCustomer);
app.delete("/customer/:id", auth, CustomerService.deleteCustomer);
app.get("/customer/:id", auth, CustomerService.getCustomerById);

// routes untuk transaction (role users / karyawan toko)
app.get("/transaction", auth, TransactionService.getTrans);
app.get("/transaction/:id", auth, TransactionService.getTransById);

// routes untuk (role customer)
app.post("/login_customer", CustomerService.login);

// routes untuk transaction (role customer)
app.post("/customer/transaction", auth_customer, TransactionService.addTrans);
app.get(
  "/customer/transaction/:id",
  auth_customer,
  TransactionService.customerGetTransById
);

app.listen(port, host, () => {
  console.log(`server REST API berjalan di http://${host}:${port}`);
});
