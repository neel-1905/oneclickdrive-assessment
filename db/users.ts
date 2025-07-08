import { randomUUID } from "crypto";
import { db } from "./schema";

const insert = db.prepare(`
    INSERT INTO users (id, username, password)
    VALUES (?,?,?)
    `);

insert.run(randomUUID(), "admin", "admin123");
console.log("User inserted");
