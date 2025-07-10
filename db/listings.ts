import { randomUUID } from "crypto";
import { db } from "./schema";

const insert = db.prepare(`
    INSERT INTO listings (id, name, location, price_per_day)
    VALUES (?,?,?,?)
    `);

const cars = [
  { name: "Hyundai Verna", price_per_day: 2200, location: "Mumbai" },
  { name: "Hyundai Creta", price_per_day: 2500, location: "Mumbai" },
  { name: "Hyundai Tucson", price_per_day: 3200, location: "Mumbai" },
  { name: "Hyundai Elantra", price_per_day: 2800, location: "Mumbai" },
  { name: "Hyundai Kona Electric", price_per_day: 3100, location: "Mumbai" },
  { name: "Hyundai Aura", price_per_day: 1900, location: "Mumbai" },
  { name: "Hyundai Exter", price_per_day: 2000, location: "Jaipur" },
  { name: "Hyundai Santro", price_per_day: 1500, location: "Ahmedabad" },
  {
    name: "Hyundai Grand i10 Nios",
    price_per_day: 1800,
    location: "Hyderabad",
  },
  { name: "Hyundai Xcent", price_per_day: 1700, location: "Nagpur" },
];

for (const car of cars) {
  insert.run(randomUUID(), car.name, car.location, car.price_per_day);
}

console.log("Inserted 10 cars");
