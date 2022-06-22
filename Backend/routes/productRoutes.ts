import { Router } from "express";
import { getProducts, getProductById } from "../controllers/productController";

const router = Router();

router.route("/").get(getProducts).post();
router.route("/:id").get(getProductById).delete().put();
router.route("/top").get().post();
router.route("/:id/reviews").get().post();

export default router;
