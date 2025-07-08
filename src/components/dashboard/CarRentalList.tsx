import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";
import { CAR_RENTAL } from "@/types";

const CarRentalList = ({ listings }: { listings: CAR_RENTAL[] }) => {
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
        {listings?.map(
          ({ id, location, name, price_per_day, status }, index) => {
            return (
              <TableRow key={id}>
                <TableCell className="py-4">{index + 1}</TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{price_per_day}</TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={status} />
                </TableCell>
                <TableCell className="text-center">
                  <ActionMenu currentStatus={status} />
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
