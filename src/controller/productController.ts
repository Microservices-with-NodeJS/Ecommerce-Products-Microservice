import { Request, Response } from "express";
import * as productService from "../services/productService";
import { CustomRequest } from "nodejs_ms_shared_library";
import { publishToRabbitMQ } from "nodejs_ms_shared_library";

const createProduct = async (req: CustomRequest, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);

    // After successfully creating a product, publish a "ProductCreated" event
    const productCreatedEvent = {
      productId: product.id, // Assuming you have the product's ID in the model
      productName: product.title,
      // add any other relevant product data ...
    };

    // Use the RabbitMQ publishing function
    await publishToRabbitMQ(
      "your_exchange",
      "ProductCreated",
      JSON.stringify(productCreatedEvent),
      {
        host: process.env.RABBIT_MQ_HOST,
        port: Number(process.env.RABBIT_MQ_PORT),
        username: process.env.RABBIT_MQ_USERNAME,
        password: process.env.RABBIT_MQ_HOST,
      }
    );

    res.status(201).json({
      message: "Product created successfully!",
      user: req.user,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req: CustomRequest, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ products, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req: CustomRequest, res: Response) => {
  const productId = parseInt(req.params.id, 10);
  try {
    const product = await productService.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json({ product, user: req.user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req: CustomRequest, res: Response) => {
  const productId = parseInt(req.params.id, 10);
  try {
    const product = await productService.updateProduct(productId, req.body);
    res.status(200).json({ product, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req: CustomRequest, res: Response) => {
  const productId = parseInt(req.params.id, 10);
  try {
    await productService.deleteProduct(productId);
    res.status(200).json({
      message: "Product deleted successfully!",
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
