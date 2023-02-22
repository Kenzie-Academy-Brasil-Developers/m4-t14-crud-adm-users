import { QueryConfig } from "pg";
import { client } from "../../database";

export const deleteUserServices = async (userId: number): Promise<void> => {
  const queryString: string = `
    UPDATE 
        users
    SET
        "active"= false
    WHERE
        id=$1

  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };
  await client.query(queryConfig);
};
