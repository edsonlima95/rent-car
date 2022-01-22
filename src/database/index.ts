import { Connection, createConnection, getConnectionOptions } from "typeorm";

// import { createConnection } from "typeorm";

// createConnection();

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection();
};