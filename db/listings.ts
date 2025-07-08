import { randomUUID } from "crypto";
import { db } from "./schema";

const insert = db.prepare(`
    INSERT INTO listings (id, name, location, price_per_day)
    VALUES (?,?,?,?)
    `);

const cars = [
  { name: "Toyota Corolla 2020", location: "Mumbai", price: 1200 },
  { name: "Hyundai i20", location: "Delhi", price: 1100 },
  { name: "Maruti Swift", location: "Bangalore", price: 1000 },
  { name: "Honda City", location: "Chennai", price: 1400 },
  { name: "Tata Nexon EV", location: "Pune", price: 1500 },
  { name: "Kia Seltos", location: "Hyderabad", price: 1350 },
  { name: "Renault Kwid", location: "Kolkata", price: 900 },
  { name: "Skoda Slavia", location: "Ahmedabad", price: 1450 },
  { name: "Mahindra Thar", location: "Goa", price: 1800 },
  { name: "Volkswagen Polo", location: "Jaipur", price: 1050 },
];

for (const car of cars) {
  insert.run(randomUUID(), car.name, car.location, car.price);
}

console.log("Inserted 10 cars");
