import { Request, RequestHandler, Response } from "express";
import { NextFunction } from "express-serve-static-core";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler =
  (handler: AsyncHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      if (err instanceof Error && err.name === "ValidationError") {
        res.status(404).send({ message: err.message });
      } else if (err instanceof Error && err.name === "CastError") {
        res.status(404).send({ message: "Cannot find given id." });
      } else {
        res
          .status(500)
          .send({
            message: err instanceof Error ? err.message : "Unknown error",
          });
      }
    }
  };
