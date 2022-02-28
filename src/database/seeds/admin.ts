import { hash } from "bcrypt";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = await connection.query("SELECT id as id FROM users ORDER BY id DESC LIMIT 1");
  
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, admin, createdAt, drive_license ) 
      values('${id}', 'admin', 'admin@gmail.com', '${password}', true, 'now()', 'XXXXXX')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));