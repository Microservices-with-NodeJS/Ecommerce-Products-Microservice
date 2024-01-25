import { NextFunction, Response } from "express";
import {
  CustomRequest,
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "nodejs_ms_shared_library";

// Wrap the middleware functions with their parameters

// Verify token from the client
export const verifyTokenMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, next, process.env.JWT_SEC);
};

// Verify token and authorise account owner
export const verifyTokenAndAuthoriationMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  verifyTokenAndAuthorization(req, res, next, process.env.JWT_SEC);
};

// Verify token and authorise admin
export const verifyTokenAndAdminMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  verifyTokenAndAdmin(req, res, next, process.env.JWT_SEC);
};
