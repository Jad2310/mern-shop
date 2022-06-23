import { Schema, model } from "mongoose";

interface IReview {
    name: string;
    rating: number;
    comment: string;
    user: Schema.Types.ObjectId | string;
}

interface IProduct {
    user: Schema.Types.ObjectId;
    name: string;
    image: string;
    brand: string;
    category: string;
    description: string;
    reviews: IReview[];
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;
}

const reviewSchema = new Schema<IReview>(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = new Schema<IProduct>(
    {
        user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        name: { type: String, required: true },
        image: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        reviews: { type: [reviewSchema], required: true },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
    }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
