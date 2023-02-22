import { QueryResult } from "pg";
import { client } from "../../database";
import { IAllUser } from "../../interfaces/users.interfaces";

export const listUsersService = async (): Promise<IAllUser> => {
  const queryString: string = `
        SELECT
             *
        FROM
            users
          
        `;

  const queryResult: QueryResult = await client.query(queryString);

  return queryResult.rows;
};
