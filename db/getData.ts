import { db } from "./schema";

const username = "admin"; // ← replace with dynamic value if needed

// const userStmt = db.prepare(`
//   SELECT * FROM users WHERE username = ?
// `);
// const user = userStmt.get(username);

// if (user) {
//   console.log("Found user:", user);
// } else {
//   console.log("User not found");
// }

const carStmt = db.prepare(`
    SELECT * FROM listings
    `);

const cars = carStmt.all();

if (cars) {
  console.log("Cars:", cars);
} else {
  console.log("No cars found");
}
