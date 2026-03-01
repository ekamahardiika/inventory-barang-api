import { Response } from "express";

type AppErrorKey =
  | "NO_TOKEN"
  | "NO_USER"
  | "USER_EXIST"
  | "NO_CREDENTIALS"
  | "INVALID_CREDENTIALS"
  | "CATEGORY_NOT_EXIST"
  | "PRODUCT_NOT_EXIST"
  | "UANG_TIDAK_CUKUP"
  | "STOK_TIDAK_CUKUP";

const errorMap: Record<
  AppErrorKey,
  { status: number; message: string }
> = {
  NO_TOKEN: {
    status: 401,
    message: "Authentication token not found",
  },
  NO_USER: {
    status: 404,
    message: "User not found",
  },
  USER_EXIST: {
    status: 400,
    message: "User already exists",
  },
  NO_CREDENTIALS: {
    status: 400,
    message: "Credentials not complete",
  },
  INVALID_CREDENTIALS: {
    status: 401,
    message: "Invalid email or password",
  },
  CATEGORY_NOT_EXIST: {
    status: 404,
    message: "Category not found",
  },
  PRODUCT_NOT_EXIST: {
    status: 404,
    message: "Product not found",
  },
  STOK_TIDAK_CUKUP: {
    status: 404,
    message: "Stok tidak cukup",
  },
  UANG_TIDAK_CUKUP: {
    status: 404,
    message: "Uang tidak cukup",
  }
};

export function errorHandler(error: unknown, res: Response) {
  if (error instanceof Error) {
    const key = error.message as AppErrorKey;

    if (errorMap[key]) {
      return res.status(errorMap[key].status).json({
        message: errorMap[key].message,
      });
    }
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal server error",
  });
}