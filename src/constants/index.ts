import { LayoutDashboard, ScrollText } from "lucide-react";

const navRoutes = [
  { title: "Dashboard", url: `/dashboard`, icon: LayoutDashboard },
  { title: "Logs", url: `/dashboard/logs`, icon: ScrollText },
];

const dummyCarRentalList = [
  {
    id: 1,
    name: "Toyota Corolla 2020",
    location: "Delhi",
    pricePerDay: 3200,
    status: "Approved",
  },
  {
    id: 2,
    name: "Hyundai Creta 2022",
    location: "Bangalore",
    pricePerDay: 4000,
    status: "Rejected",
  },
  {
    id: 3,
    name: "Tata Nexon EV 2023",
    location: "Mumbai",
    pricePerDay: 4500,
    status: "Pending",
  },
  {
    id: 4,
    name: "Maruti Swift 2019",
    location: "Chennai",
    pricePerDay: 2500,
    status: "Approved",
  },
  {
    id: 5,
    name: "Honda City 2021",
    location: "Pune",
    pricePerDay: 3700,
    status: "Rejected",
  },
];

export { navRoutes, dummyCarRentalList };
