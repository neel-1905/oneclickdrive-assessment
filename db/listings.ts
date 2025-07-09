import { randomUUID } from "crypto";
import { db } from "./schema";

const insert = db.prepare(`
    INSERT INTO listings (id, name, location, price_per_day)
    VALUES (?,?,?,?)
    `);

const cars = [
  { name: "Ford EcoSport", location: "Nagpur", price: 1300 },
  { name: "MG Hector", location: "Surat", price: 1600 },
  { name: "Jeep Compass", location: "Lucknow", price: 1700 },
  { name: "Nissan Magnite", location: "Patna", price: 1250 },
  { name: "Hyundai Venue", location: "Bhopal", price: 1320 },
  { name: "Toyota Fortuner", location: "Ranchi", price: 2200 },
  { name: "Maruti Ciaz", location: "Amritsar", price: 1180 },
  { name: "Honda Amaze", location: "Indore", price: 1120 },
  { name: "Kia Carens", location: "Vadodara", price: 1380 },
  { name: "Renault Triber", location: "Coimbatore", price: 1080 },
  { name: "Tata Harrier", location: "Thiruvananthapuram", price: 1750 },
  { name: "Skoda Kushaq", location: "Visakhapatnam", price: 1480 },
  { name: "Hyundai Alcazar", location: "Mysore", price: 1550 },
  { name: "Volkswagen Taigun", location: "Nashik", price: 1470 },
  { name: "Maruti Ertiga", location: "Vijayawada", price: 1200 },
  { name: "Toyota Innova Crysta", location: "Jodhpur", price: 1900 },
  { name: "Honda WR-V", location: "Guwahati", price: 1150 },
  { name: "Mahindra XUV700", location: "Dehradun", price: 1850 },
  { name: "Nissan Kicks", location: "Raipur", price: 1290 },
  { name: "Ford Aspire", location: "Udaipur", price: 1020 },
];

for (const car of cars) {
  insert.run(randomUUID(), car.name, car.location, car.price);
}

console.log("Inserted 10 cars");
