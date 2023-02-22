import { QueryConfig } from "pg";
import { client } from "../../database";
import { ILoginRequest } from "../../interfaces/login.interfaces";
import "dotenv/config";

import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserWithPassResult } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";

export const createLoginServices = async (
  loginData: ILoginRequest
): Promise<string> => {
  const queryString: string = `
    SELECT
        *
    FROM
      users
    WHERE
        email=$1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [loginData.email],
  };

  const queryResult: IUserWithPassResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email or password", 401);
  }

  const matchPassword: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );

  if (!matchPassword) {
    throw new AppError("Wrong email or password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );
  return token;
};
