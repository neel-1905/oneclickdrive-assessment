import { CAR_RENTAL } from "@/types";
import { LayoutDashboard, ScrollText } from "lucide-react";

const navRoutes = [
  { title: "Dashboard", url: `/dashboard`, icon: LayoutDashboard },
  { title: "Logs", url: `/dashboard/logs`, icon: ScrollText },
];

const dummyCarRentalList: CAR_RENTAL[] = [
  {
    id: "Car-1",
    name: "Toyota Corolla 2020",
    location: "Delhi",
    price_per_day: 3200,
    status: "approved",
    createdAt: "2025-07-01T10:00:00.000Z",
    updatedAt: "2025-07-02T12:00:00.000Z",
  },
  {
    id: "Car-2",
    name: "Hyundai Creta 2022",
    location: "Bangalore",
    price_per_day: 4000,
    status: "rejected",
    createdAt: "2025-07-03T09:30:00.000Z",
    updatedAt: "2025-07-04T11:00:00.000Z",
  },
  {
    id: "Car-3",
    name: "Tata Nexon EV 2023",
    location: "Mumbai",
    price_per_day: 4500,
    status: "pending",
    createdAt: "2025-07-05T14:45:00.000Z",
    updatedAt: "2025-07-06T16:00:00.000Z",
  },
  {
    id: "Car-4",
    name: "Maruti Swift 2019",
    location: "Chennai",
    price_per_day: 2500,
    status: "approved",
    createdAt: "2025-07-02T08:15:00.000Z",
    updatedAt: "2025-07-03T10:20:00.000Z",
  },
  {
    id: "Car-5",
    name: "Honda City 2021",
    location: "Pune",
    price_per_day: 3700,
    status: "rejected",
    createdAt: "2025-07-01T17:30:00.000Z",
    updatedAt: "2025-07-02T19:00:00.000Z",
  },
];

export { navRoutes, dummyCarRentalList };
