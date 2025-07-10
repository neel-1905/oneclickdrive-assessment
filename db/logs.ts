import { db } from "./schema";

// const result = db.prepare("PRAGMA table_info(logs)").all();
// console.log("Current columns in logs table:", result);

const result = db.prepare("SELECT * FROM logs").all();

console.log(result);
