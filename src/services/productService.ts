import { PrismaClient } from "../prisma/client";

const prisma = new PrismaClient();

// Create new product
const createProduct = async (data: any) => {
  return prisma.product.create({
    data,
  });
};

// Get all products
const getAllProducts = async () => {
  return prisma.product.findMany();
};

// Get product by id
const getProductById = async (productId: number) => {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
};

// Update product
const updateProduct = async (productId: number, data: any) => {
  return prisma.product.update({
    where: {
      id: productId,
    },
    data,
  });
};

// Delete product
const deleteProduct = async (productId: number) => {
  return prisma.product.delete({
    where: {
      id: productId,
    },
  });
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
