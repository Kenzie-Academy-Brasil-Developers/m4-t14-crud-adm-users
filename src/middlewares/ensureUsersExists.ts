import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../errors";

export const ensureUsersExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = parseInt(request.params.id);
  const queryStringUserExis: string = `
    SELECT
        *
    FROM
        users
    WHERE
        id=$1
    `;
  const queryConfigUserExis: QueryConfig = {
    text: queryStringUserExis,
    values: [userId],
  };
  const queryResult: QueryResult = await client.query(queryConfigUserExis);

  if (queryResult.rowCount === 0) {
    throw new AppError("user not found", 404);
  }
  return next();
};
