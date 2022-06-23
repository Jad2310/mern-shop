import { Router } from "express";
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
} from "../controllers/productController";

const router = Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/top").get(getTopProducts);
router
    .route("/:id")
    .get(getProductById)
    .delete(deleteProduct)
    .put(updateProduct);
router.route("/:id/reviews").post(createProductReview);

export default router;
