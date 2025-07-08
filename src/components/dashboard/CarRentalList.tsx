import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { dummyCarRentalList } from "@/constants";
import { Button } from "../ui/button";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";

const CarRentalList = () => {
  return (
    <Table className="w-full">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="py-4">SN.</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price Per Day</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyCarRentalList?.map(
          ({ id, location, name, pricePerDay, status }, index) => {
            return (
              <TableRow key={id}>
                <TableCell className="py-4">{index + 1}</TableCell>
                <TableCell>{id}</TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{pricePerDay}</TableCell>
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
