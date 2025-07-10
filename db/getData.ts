import { db } from "./schema";

const email = "admin@gmail.com";

const userStmt = db.prepare(`
  SELECT * FROM users WHERE email = ?
`);
const user = userStmt.get(email);

if (user) {
  console.log("Found user:", user);
} else {
  console.log("User not found");
}

// const carStmt = db.prepare(`
//     SELECT * FROM listings
//     `);

// const cars = carStmt.all();

// if (cars) {
//   console.log("Cars:", cars);
// } else {
//   console.log("No cars found");
// }
