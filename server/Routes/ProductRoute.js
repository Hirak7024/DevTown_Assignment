import express from "express";
import { createProduct, updateProduct, deleteProduct, getProduct, getProductByCategory, getProducts } from "../Controllers/ProductController.js";

const router = express.Router();

router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.get("/getProductById/:id", getProduct);
router.delete("/delete/:id", deleteProduct);
// router.post("/getProductByCategory", getProductByCategory);
router.get("/getProducts", getProducts);

export default router;