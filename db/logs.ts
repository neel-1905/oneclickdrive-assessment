import { db } from "./schema";

const result = db.prepare("SELECT * FROM logs").all();

console.log(result);
