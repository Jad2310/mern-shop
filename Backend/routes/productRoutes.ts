import { Router } from "express";
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
} from "../controllers/productController";

const router = Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProductById).delete(deleteProduct).put();
router.route("/top").get().post();
router.route("/:id/reviews").get().post();

export default router;
