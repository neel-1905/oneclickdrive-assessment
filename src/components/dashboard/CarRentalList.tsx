import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CAR_RENTAL, STATUS } from "@/types";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";

const CarRentalList = ({ listings }: { listings: CAR_RENTAL[] }) => {
  const [carList, setCarList] = useState(listings);

  const handleStatusChange = async (id: string, status: STATUS) => {
    console.log("updating", id, status);

    const res = await fetch(`/api/listings/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, status }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.log("Error", result?.error);
      return;
    }

    alert(result.message);

    setCarList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: status } : item))
    );
  };

  return (
    <Table className="w-full">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="py-4">SN.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price Per Day</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carList?.map(
          (
            { id, createdAt, location, name, price_per_day, status, updatedAt },
            index
          ) => {
            return (
              <TableRow key={id}>
                <TableCell className="py-4">{index + 1}</TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{price_per_day}</TableCell>
                <TableCell className="text-center w-[120px]">
                  <StatusBadge status={status} />
                </TableCell>
                <TableCell className="text-center">
                  <ActionMenu
                    listingId={id}
                    currentStatus={status}
                    onStatusChange={handleStatusChange}
                  />
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};

export default CarRentalList;
