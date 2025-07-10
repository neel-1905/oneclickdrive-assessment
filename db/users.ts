import { randomUUID } from "crypto";
import { db } from "./schema";

const insert = db.prepare(`
    INSERT INTO users (id, email, password)
    VALUES (?,?,?)
    `);

insert.run(randomUUID(), "johndoe@gmail.com", "john123");
console.log("User inserted");
